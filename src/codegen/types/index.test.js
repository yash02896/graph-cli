const codegen = require('.')

test('EthereumValue -> AssemblyScript: address', () => {
  expect(codegen.ethereumToAsc('address', 'x')).toBe('x.toAddress()')
})

test('EthereumValue -> AssemblyScript: bool', () => {
  expect(codegen.ethereumToAsc('bool', 'x')).toBe('x.toBoolean()')
})

test('EthereumValue -> AssemblyScript: byte', () => {
  expect(codegen.ethereumToAsc('byte', 'x')).toBe('x.toBytes()')
})

test('EthereumValue -> AssemblyScript: bytes', () => {
  expect(codegen.ethereumToAsc('bytes', 'x')).toBe('x.toBytes()')
})

test('EthereumValue -> AssemblyScript: bytes17', () => {
  expect(codegen.ethereumToAsc('bytes17', 'x')).toBe('x.toBytes()')
})

test('AssemblyScript -> Value: Address', () => {
  expect(codegen.ascToValue('Address', 'x')).toBe('Value.fromAddress(x)')
})
