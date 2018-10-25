const codegen = require('.')

// Address

test('EthereumValue -> AssemblyScript: address -> Address', () => {
  expect(codegen.ethereumValueToAsc('x', 'address')).toBe('x.toAddress()')
})

test('AssemblyScript -> EthereumValue: Address -> address', () => {
  expect(codegen.ascValueToEthereum('x', 'address')).toBe('EthereumValue.fromAddress(x)')
})

// Boolean

test('EthereumValue -> AssemblyScript: bool -> boolean', () => {
  expect(codegen.ethereumValueToAsc('x', 'bool')).toBe('x.toBoolean()')
})

test('AssemblyScript -> EthereumValue: boolean -> bool', () => {
  expect(codegen.ascValueToEthereum('x', 'bool')).toBe('EthereumValue.fromBool(x)')
})

// EthereumValue -> AssemblyScript: byte + bytes variants

test('EthereumValue -> AssemblyScript: byte -> Bytes', () => {
  expect(codegen.ethereumValueToAsc('x', 'byte')).toBe('x.toBytes()')
})

test('EthereumValue -> AssemblyScript: bytes -> Bytes', () => {
  expect(codegen.ethereumValueToAsc('x', 'bytes')).toBe('x.toBytes()')
})

test('EthereumValue -> AssemblyScript: bytes0 (invalid)', () => {
  expect(() => codegen.ethereumValueToAsc('x', 'bytes0')).toThrow()
})

test('EthereumValue -> AssemblyScript: bytes1..32 -> Bytes', () => {
  for (let i = 1; i <= 32; i++) {
    expect(codegen.ethereumValueToAsc('x', `bytes${i}`)).toBe('x.toBytes()')
  }
})

test('EthereumValue -> AssemblyScript: bytes33 (invalid)', () => {
  expect(() => codegen.ethereumValueToAsc('x', 'bytes33')).toThrow()
})

// AssemblyScript -> EthereumValue: byte + bytes variants

test('AssemblyScript -> EthereumValue: Bytes -> byte', () => {
  expect(codegen.ascValueToEthereum('x', 'byte')).toBe('EthereumValue.fromBytes(x)')
})

test('AssemblyScript -> EthereumValue: Bytes -> bytes', () => {
  expect(codegen.ascValueToEthereum('x', 'bytes')).toBe('EthereumValue.fromBytes(x)')
})

test('AssemblyScript -> EthereumValue: Bytes -> bytes0 (invalid)', () => {
  expect(() => codegen.ascValueToEthereum('x', 'bytes0')).toThrow()
})

test('AssemblyScript -> EthereumValue: Bytes -> bytes1..32', () => {
  for (let i = 1; i <= 32; i++) {
    expect(codegen.ascValueToEthereum('x', `bytes${i}`)).toBe(
      'EthereumValue.fromBytes(x)'
    )
  }
})

test('AssemblyScript -> EthereumValue: Bytes -> bytes33 (invalid)', () => {
  expect(() => codegen.ascValueToEthereum('x', 'bytes33')).toThrow()
})

// EthereumValue -> AssemblyScript: (u)int variants

test('EthereumValue -> AssemblyScript: (u)int8..32 -> (u,i)32', () => {
  for (let i = 8; i <= 32; i += 8) {
    expect(codegen.ethereumValueToAsc('x', `int${i}`)).toBe('x.toI32()')
    expect(codegen.ethereumValueToAsc('x', `uint${i}`)).toBe('x.toU32()')
  }
})

test('EthereumValue -> AssemblyScript: (u)int40...256 -> BigInt', () => {
  for (let i = 40; i <= 256; i += 8) {
    expect(codegen.ethereumValueToAsc('x', `int${i}`)).toBe('x.toBigInt()')
    expect(codegen.ethereumValueToAsc('x', `uint${i}`)).toBe('x.toBigInt()')
  }
})

// AssemblyScript -> EthereumValue: (u)int variants

test('AssemblyScript -> EthereumValue: (u,i)32 -> (u)int8..32', () => {
  for (let i = 8; i <= 32; i += 8) {
    expect(codegen.ascValueToEthereum('x', `int${i}`)).toBe(`EthereumValue.fromI32(x)`)
    expect(codegen.ascValueToEthereum('x', `uint${i}`)).toBe(`EthereumValue.fromU32(x)`)
  }
})

test('AssemblyScript -> EthereumValue: BigInt -> (u)int40...256', () => {
  for (let i = 40; i <= 256; i += 8) {
    expect(codegen.ascValueToEthereum('x', `int${i}`)).toBe(`EthereumValue.fromBigInt(x)`)
    expect(codegen.ascValueToEthereum('x', `uint${i}`)).toBe(
      `EthereumValue.fromBigInt(x)`
    )
  }
})

// String

test('EthereumValue -> AssemblyScript: string -> String', () => {
  expect(codegen.ethereumValueToAsc('x', 'string')).toBe('x.toString()')
})

test('AssemblyScript -> EthereumValue: String -> string', () => {
  expect(codegen.ascValueToEthereum('x', 'string')).toBe('EthereumValue.fromString(x)')
})
