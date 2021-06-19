import { URL } from 'url'
import chalk from 'chalk'

import { identifyAccessToken } from '../command-helpers/auth'
import { createCompiler } from '../command-helpers/compiler'
import { fixParameters } from '../command-helpers/gluegun'
import { createJsonRpcClient } from '../command-helpers/jsonrpc'
import { validateNodeUrl } from '../command-helpers/node'

const HELP = `
${chalk.bold('graph deploy')} [options] ${chalk.bold('<subgraph-name>')} ${chalk.bold(
  '[<subgraph-manifest>]',
)}

Options:

      --access-token <token>    Graph access token
  -g, --node <node>             Graph node to deploy the subgraph to
  -h, --help                    Show usage information
  -i, --ipfs <node>             Upload build results to an IPFS node
  -o, --output-dir <path>       Output directory for build results (default: build/)
      --skip-migrations         Skip subgraph migrations (default: false)
  -w, --watch                   Regenerate types when subgraph files change (default: false)
`

module.exports = {
  description: 'Deploys the subgraph to a Graph node',
  run: async toolbox => {
    // Obtain tools
    const { filesystem, print } = toolbox

    // Parse CLI parameters
    const { g, h, i, o, skipMigrations, w } = toolbox.parameters.options
    let {
      accessToken,
      help,
      ipfs,
      node,
      outputDir,
      watch,
    } = toolbox.parameters.options

    // Support both long and short option variants
    help = help || h
    ipfs = ipfs || i
    node = node || g
    outputDir = outputDir || o
    watch = watch || w

    let subgraphName, manifest
    try {
      ;[subgraphName, manifest] = fixParameters(toolbox.parameters, {
        h,
        help,
        w,
        watch,
      })
    } catch (e) {
      print.error(e.message)
      process.exitCode = 1
      return
    }

    // Fall back to default values for options / parameters
    outputDir = outputDir && outputDir !== '' ? outputDir : filesystem.path('build')
    manifest =
      manifest !== undefined && manifest !== ''
        ? manifest
        : filesystem.resolve('subgraph.yaml')

    // Show help text if requested
    if (help) {
      print.info(HELP)
      return
    }

    // Validate the subgraph name
    if (!subgraphName) {
      print.error('No subgraph name provided')
      print.info(HELP)
      process.exitCode = 1
      return
    }

    // Validate node
    if (!node) {
      print.error(`No Graph node provided`)
      print.info(HELP)
      process.exitCode = 1
      return
    }
    try {
      validateNodeUrl(node)
    } catch (e) {
      print.error(`Graph node "${node}" is invalid: ${e.message}`)
      process.exitCode = 1
      return
    }

    // Validate IPFS
    if (!ipfs) {
      print.error(`No IPFS node provided`)
      print.info(HELP)
      process.exitCode = 1
      return
    }

    const compiler = createCompiler(manifest, {
      ipfs,
      outputDir,
      outputFormat: 'wasm',
      skipMigrations,
    })

    // Exit with an error code if the compiler couldn't be created
    if (!compiler) {
      process.exitCode = 1
      return
    }

    const hostedService = node.match(/thegraph.com/)
    const requestUrl = new URL(node)
    const client = createJsonRpcClient(requestUrl)

    // Exit with an error code if the client couldn't be created
    if (!client) {
      process.exitCode = 1
      return
    }

    // Use the access token, if one is set
    accessToken = await identifyAccessToken(node, accessToken)
    if (accessToken !== undefined && accessToken !== null) {
      client.options.headers = { Authorization: 'Bearer ' + accessToken }
    }

    const deploySubgraph = async ipfsHash => {
      const spinner = print.spin(`Deploying to Graph node ${requestUrl}`)
      //       `Failed to deploy to Graph node ${requestUrl}`,
      client.request(
        'subgraph_deploy',
        { name: subgraphName, ipfs_hash: ipfsHash },
        async (requestError, jsonRpcError, res) => {
          if (jsonRpcError) {
            spinner.fail(
              `Failed to deploy to Graph node ${requestUrl}: ${jsonRpcError.message}`,
            )

            // Provide helpful advice when the subgraph has not been created yet
            if (jsonRpcError.message.match(/subgraph name not found/)) {
              if (hostedService) {
                print.info(`
You may need to create it at https://thegraph.com/explorer/dashboard.`)
              } else {
                print.info(`
Make sure to create the subgraph first by running the following command:
$ graph create --node ${node} ${subgraphName}`)
              }
            }
            process.exitCode = 1
          } else if (requestError) {
            spinner.fail(`HTTP error deploying the subgraph ${requestError.code}`)
            process.exitCode = 1
          } else {
            spinner.stop()

            const base = requestUrl.protocol + '//' + requestUrl.hostname
            let playground = res.playground
            let queries = res.queries
            let subscriptions = res.subscriptions

            // Add a base URL if graph-node did not return the full URL
            if (playground.charAt(0) === ':') {
              playground = base + playground
            }
            if (queries.charAt(0) === ':') {
              queries = base + queries
            }
            if (subscriptions.charAt(0) === ':') {
              subscriptions = base + subscriptions
            }

            if (hostedService) {
              print.success(
                `Deployed to ${chalk.blue(
                  `https://thegraph.com/explorer/subgraph/${subgraphName}`,
                )}`,
              )
            } else {
              print.success(`Deployed to ${chalk.blue(`${playground}`)}`)
            }
            print.info('\nSubgraph endpoints:')
            print.info(`Queries (HTTP):     ${queries}`)
            print.info(`Subscriptions (WS): ${subscriptions}`)
            print.info(``)
          }
        },
      )
    }

    if (watch) {
      await compiler.watchAndCompile(async ipfsHash => {
        if (ipfsHash !== undefined) {
          await deploySubgraph(ipfsHash)
        }
      })
    } else {
      const result = await compiler.compile()
      if (result === undefined || result === false) {
        // Compilation failed, not deploying.
        process.exitCode = 1
        return
      }
      await deploySubgraph(result)
    }
  },
}
