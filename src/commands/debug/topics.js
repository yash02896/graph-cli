const chalk = require('chalk')
const ethers = require('ethers')
const immutable = require('immutable')
const yaml = require('yaml')
const { fixParameters } = require('../../command-helpers/gluegun')
const Subgraph = require('../../subgraph')

const HELP = `
${chalk.bold('graph debug topics')} ${chalk.dim('[options]')} ${chalk.bold(
  '<subgraph-manifest>',
)}

${chalk.dim('Options:')}

  -h, --help                    Show usage information
`

module.exports = {
  description: 'Lists all Ethereum event topics by data source',
  run: async toolbox => {
    // Obtain tools
    let { filesystem, print, system } = toolbox

    // Read CLI parameters
    let { h, help } = toolbox.parameters.options

    // Show help text if requested
    if (h || help) {
      print.info(HELP)
      return
    }

    let manifest
    try {
      ;[manifest] = fixParameters(toolbox.parameters, {
        h,
        help,
      })
    } catch (e) {
      print.error(e.message)
      process.exitCode = 1
      return
    }

    // Fall back to default manifest file
    manifest =
      manifest !== undefined && manifest !== ''
        ? manifest
        : filesystem.resolve('subgraph.yaml')

    // Load subgraph manifest
    let subgraph
    try {
      subgraph = Subgraph.load(manifest).result
    } catch (e) {
      print.error(`Failed to load subgraph from ${manifest}: ${e.message}`)
      process.exitCode = 1
      return
    }

    let topics = subgraph
      .get('dataSources')
      .concat(subgraph.get('templates', immutable.List()))
      .map(dataSource => ({
        name: dataSource.get('name'),
        address: dataSource.getIn(['source', 'address'], null),
        topics: dataSource
          .getIn(['mapping', 'eventHandlers'], immutable.List())
          .map(handler => ({
            event: handler.get('event'),
            topic: ethers.utils.solidityKeccak256(['string'], [handler.get('event')]),
          })),
      }))

    console.log(yaml.stringify(topics.toJS()).trim())
  },
}
