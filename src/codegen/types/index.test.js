const codegen = require('.')

describe('EthereumValue -> AssemblyScript', () => {
  test('address -> Address', () => {
    expect(codegen.ethereumValueToAsc('x', 'address')).toBe('x.toAddress()')
  })

  test('bool -> boolean', () => {
    expect(codegen.ethereumValueToAsc('x', 'bool')).toBe('x.toBoolean()')
  })

  test('byte -> Bytes', () => {
    expect(codegen.ethereumValueToAsc('x', 'byte')).toBe('x.toBytes()')
  })

  test('bytes -> Bytes', () => {
    expect(codegen.ethereumValueToAsc('x', 'bytes')).toBe('x.toBytes()')
  })

  test('bytes0 (invalid)', () => {
    expect(() => codegen.ethereumValueToAsc('x', 'bytes0')).toThrow()
  })

  test('bytes1..32 -> Bytes', () => {
    for (let i = 1; i <= 32; i++) {
      expect(codegen.ethereumValueToAsc('x', `bytes${i}`)).toBe('x.toBytes()')
    }
  })

  test('bytes33 (invalid)', () => {
    expect(() => codegen.ethereumValueToAsc('x', 'bytes33')).toThrow()
  })

  test('(u)int8..32 -> (u,i)32', () => {
    for (let i = 8; i <= 32; i += 8) {
      expect(codegen.ethereumValueToAsc('x', `int${i}`)).toBe('x.toI32()')
      expect(codegen.ethereumValueToAsc('x', `uint${i}`)).toBe('x.toU32()')
    }
  })

  test('(u)int40...256 -> BigInt', () => {
    for (let i = 40; i <= 256; i += 8) {
      expect(codegen.ethereumValueToAsc('x', `int${i}`)).toBe('x.toBigInt()')
      expect(codegen.ethereumValueToAsc('x', `uint${i}`)).toBe('x.toBigInt()')
    }
  })

  test('string -> String', () => {
    expect(codegen.ethereumValueToAsc('x', 'string')).toBe('x.toString()')
  })
})

describe('AssemblyScript -> EthereumValue', () => {
  test('Address -> address', () => {
    expect(codegen.ethereumValueFromAsc('x', 'address')).toBe(
      'EthereumValue.fromAddress(x)'
    )
  })

  test('boolean -> bool', () => {
    expect(codegen.ethereumValueFromAsc('x', 'bool')).toBe('EthereumValue.fromBoolean(x)')
  })

  test('Bytes -> byte', () => {
    expect(codegen.ethereumValueFromAsc('x', 'byte')).toBe('EthereumValue.fromBytes(x)')
  })

  test('Bytes -> bytes', () => {
    expect(codegen.ethereumValueFromAsc('x', 'bytes')).toBe('EthereumValue.fromBytes(x)')
  })

  test('Bytes -> bytes0 (invalid)', () => {
    expect(() => codegen.ethereumValueFromAsc('x', 'bytes0')).toThrow()
  })

  test('Bytes -> bytes1..32', () => {
    for (let i = 1; i <= 32; i++) {
      expect(codegen.ethereumValueFromAsc('x', `bytes${i}`)).toBe(
        'EthereumValue.fromBytes(x)'
      )
    }
  })

  test('Bytes -> bytes33 (invalid)', () => {
    expect(() => codegen.ethereumValueFromAsc('x', 'bytes33')).toThrow()
  })

  test('(u,i)32 -> (u)int8..32', () => {
    for (let i = 8; i <= 32; i += 8) {
      expect(codegen.ethereumValueFromAsc('x', `int${i}`)).toBe(
        `EthereumValue.fromI32(x)`
      )
      expect(codegen.ethereumValueFromAsc('x', `uint${i}`)).toBe(
        `EthereumValue.fromU32(x)`
      )
    }
  })

  test('BigInt -> (u)int40...256', () => {
    for (let i = 40; i <= 256; i += 8) {
      expect(codegen.ethereumValueFromAsc('x', `int${i}`)).toBe(
        `EthereumValue.fromBigInt(x)`
      )
      expect(codegen.ethereumValueFromAsc('x', `uint${i}`)).toBe(
        `EthereumValue.fromBigInt(x)`
      )
    }
  })

  test('String -> string', () => {
    expect(codegen.ethereumValueFromAsc('x', 'string')).toBe(
      'EthereumValue.fromString(x)'
    )
  })
})
