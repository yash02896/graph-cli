import path from 'path'
import fs from 'fs-extra'

const getGraphTsVersion = sourceDir => {
  const pkgJsonFile = path.join(
    sourceDir,
    'node_modules',
    '@graphprotocol',
    'graph-ts',
    'package.json',
  )
  const data = fs.readFileSync(pkgJsonFile)
  const jsonData = JSON.parse(data)
  return jsonData.version
}

module.exports = {
  getGraphTsVersion: getGraphTsVersion,
}
