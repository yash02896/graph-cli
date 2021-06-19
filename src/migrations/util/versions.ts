import path from 'path'
import fs from 'fs-extra'
import yaml from 'js-yaml'

const getGraphTsVersion = sourceDir => {
  let pkgJsonFile = path.join(
    sourceDir,
    'node_modules',
    '@graphprotocol',
    'graph-ts',
    'package.json',
  )
  let data = fs.readFileSync(pkgJsonFile)
  let jsonData = JSON.parse(data)
  return jsonData.version
}

module.exports = {
  getGraphTsVersion: getGraphTsVersion,
}
