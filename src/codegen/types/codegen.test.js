const codegen = require('./codegen')

test('EthereumValue -> AssemblyScript: address', () => {
  expect(codegen.convert('EthereumValue', 'AssemblyScript', 'address', 'x')).toBe(
    'x.toAddress()'
  )
})

test('EthereumValue -> AssemblyScript: bool', () => {
  expect(codegen.convert('EthereumValue', 'AssemblyScript', 'bool', 'x')).toBe(
    'x.toBoolean()'
  )
})

test('EthereumValue -> AssemblyScript: byte', () => {
  expect(codegen.convert('EthereumValue', 'AssemblyScript', 'byte', 'x')).toBe(
    'x.toBytes()'
  )
})

test('EthereumValue -> AssemblyScript: bytes', () => {
  expect(codegen.convert('EthereumValue', 'AssemblyScript', 'bytes', 'x')).toBe(
    'x.toBytes()'
  )
})

test('EthereumValue -> AssemblyScript: bytes17', () => {
  expect(codegen.convert('EthereumValue', 'AssemblyScript', 'bytes17', 'x')).toBe(
    'x.toBytes()'
  )
})

test('AssemblyScript -> Value: address', () => {
  expect(codegen.convert('AssemblyScript', 'Value', 'Address', 'x')).toBe(
    'Value.fromAddress(x)'
  )
})
