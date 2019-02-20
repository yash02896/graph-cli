const chalk = require('chalk')
const Compiler = require('../compiler')

// Helper function to construct a subgraph compiler
function createCompiler(manifest, { ipfs, logLevel, outputDir, outputFormat, toolbox }) {
  // Parse the IPFS URL
  let url
  try {
    url = ipfs ? new URL(ipfs) : undefined
  } catch (e) {
    toolbox.print.error(`Invalid IPFS URL: ${ipfs}
The IPFS URL must be of the following format: http(s)://host[:port]/[path]`)
    return null
  }

  // Connect to the IPFS node (if a node address was provided)
  ipfs = ipfs
    ? ipfsHttpClient({
        protocol: url.protocol.replace(/[:]+$/, ''),
        host: url.hostname,
        port: url.port,
        'api-path': url.pathname.replace(/\/$/, '') + '/api/v0/',
      })
    : undefined

  return new Compiler({
    ipfs,
    subgraphManifest: manifest,
    outputDir: outputDir,
    outputFormat: outputFormat,
    logger: {
      verbosity: logLevel,
    },
  })
}

const HELP = `
${chalk.bold('graph build')} [options] ${chalk.bold('[subgraph-manifest]')}

Options:

      --ipfs <node>         Upload build results to an IPFS node
  -h, --help                Show usage information
  -o, --output-dir <path>   Output directory for build results (default: build/)
  -t, --output-format <format> 
                            Output format for mappings (wasm, wast) (default: wasm)
      --verbose             Log detailed information
  -w, --watch               Regenerate types when subgraph files change (default: false)
`

module.exports = {
  description: 'Builds a subgraph and (optionally) uploads it to IPFS',
  run: async toolbox => {
    // Obtain tools
    let { filesystem, print, system } = toolbox

    // Parse CLI parameters
    let {
      debug,
      h,
      help,
      ipfs,
      outputDir,
      outputFormat,
      verbose,
      watch,
    } = toolbox.parameters.options
    outputFormat =
      outputFormat && ['wasm', 'wast'].indexOf(outputFormat) >= 0 ? outputFormat : 'wasm'
    outputDir = outputDir && outputDir !== '' ? outputDir : filesystem.path('build')
    let manifest =
      toolbox.parameters.first !== undefined && toolbox.parameters.first !== ''
        ? toolbox.parameters.first
        : filesystem.resolve('subgraph.yaml')

    // Show help text if requested
    if (h || help) {
      print.info(HELP)
      return
    }

    let compiler = createCompiler(manifest, {
      ipfs,
      outputDir,
      outputFormat,
      logLevel: verbose || debug ? 'debug' : 'info',
    })

    // Exit with an error code if the compiler couldn't be created
    if (!compiler) {
      process.exitCode = 1
      return
    }

    // Watch subgraph files for changes or additions, trigger
    // compile (if watch argument specified)
    if (watch) {
      compiler.watchAndCompile()
    } else {
      compiler.compile().then(result => {
        if (result === false) {
          process.exitCode = 1
        }
      })
    }
  },
}
