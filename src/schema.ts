import fs from 'fs-extra'
import graphql from 'graphql/language'
import immutable from 'immutable'

import SchemaCodeGenerator from './codegen/schema'

module.exports = class Schema {
  constructor(filename, document, ast) {
    this.filename = filename
    this.document = document
    this.ast = ast
  }

  codeGenerator() {
    return new SchemaCodeGenerator(this)
  }

  static load(filename) {
    let document = fs.readFileSync(filename, 'utf-8')
    let ast = graphql.parse(document)
    return new Schema(filename, document, immutable.fromJS(ast))
  }
}
