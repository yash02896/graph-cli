import fs from 'fs-extra'
import path from 'path'
import yaml from 'js-yaml'

function loadManifest(manifestFile) {
  if(manifestFile.match(/.js$/)) {
    return require(path.resolve(manifestFile))
  }
  else {
    return yaml.safeLoad(fs.readFileSync(manifestFile, 'utf-8'))
  }
}

module.exports = {
  loadManifest
}