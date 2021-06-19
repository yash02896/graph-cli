import chalk from 'chalk'

import TypeGenerator from '../type-generator'
import { fixParameters } from '../command-helpers/gluegun'

const HELP = `
${chalk.bold('graph codegen')} [options] ${chalk.bold('[<subgraph-manifest>]')}

Options:

  -h, --help                    Show usage information
  -o, --output-dir <path>       Output directory for generated types (default: generated/)
      --skip-migrations         Skip subgraph migrations (default: false)
  -w, --watch                   Regenerate types when subgraph files change (default: false)
`

module.exports = {
  description: 'Generates AssemblyScript types for a subgraph',
  run: async toolbox => {
    // Obtain tools
    const { filesystem, print } = toolbox

    // Read CLI parameters
    const { h, o, skipMigrations, w } = toolbox.parameters.options
    let { help, outputDir, watch } = toolbox.parameters.options

    // Support both long and short option variants
    help = help || h
    outputDir = outputDir || o
    watch = watch || w

    let manifest
    try {
      ;[manifest] = fixParameters(toolbox.parameters, {
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
    outputDir =
      outputDir !== undefined && outputDir !== ''
        ? outputDir
        : filesystem.path('generated')
    manifest =
      manifest !== undefined && manifest !== ''
        ? manifest
        : filesystem.resolve('subgraph.yaml')

    // Show help text if requested
    if (help) {
      print.info(HELP)
      return
    }

    const generator = new TypeGenerator({
      subgraphManifest: manifest,
      outputDir: outputDir,
      skipMigrations,
    })

    // Watch working directory for file updates or additions, trigger
    // type generation (if watch argument specified)
    if (watch) {
      await generator.watchAndGenerateTypes()
    } else {
      if (!(await generator.generateTypes())) {
        process.exitCode = 1
      }
    }
  },
}
