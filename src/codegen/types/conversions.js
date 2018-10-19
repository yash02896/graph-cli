/**
 * Type conversions:
 * from domain | to domain | from type | to type | instance method | static method
 */
module.exports = [
  /**
   * EthereumValue -> AssemblyScript (scalar types)
   */
  ['EthereumValue', 'AssemblyScript', 'address', 'Address', 'toAddress'],
  ['EthereumValue', 'AssemblyScript', 'bool', 'boolean', 'toBoolean'],
  ['EthereumValue', 'AssemblyScript', 'byte', 'Bytes', 'toBytes'],
  ['EthereumValue', 'AssemblyScript', /bytes([0-9]+)?/, 'Bytes', 'toBytes'],
  ['EthereumValue', 'AssemblyScript', 'int8', 'i8', 'toI8'],
  ['EthereumValue', 'AssemblyScript', 'uint8', 'u8', 'toU8'],
  ['EthereumValue', 'AssemblyScript', 'int16', 'i16', 'toI16'],
  ['EthereumValue', 'AssemblyScript', 'uint16', 'u16', 'toU16'],
  ['EthereumValue', 'AssemblyScript', /int(24|32)/, 'i32', 'toI32'],
  ['EthereumValue', 'AssemblyScript', /uint(24|32)/, 'u32', 'toU32'],
  ['EthereumValue', 'AssemblyScript', /int(40|48|56|64)/, 'i64', 'toI64'],
  ['EthereumValue', 'AssemblyScript', /uint(40|48|56|64)/, 'u64', 'toU64'],
  [
    'EthereumValue',
    'AssemblyScript',
    /u?int(72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)/,
    'BigInt',
    'toBigInt',
  ],
  ['EthereumValue', 'AssemblyScript', 'string', 'String', 'toString'],

  /**
   * EthereumValue -> AssemblyScript (array types)
   */
  [
    'EthereumValue',
    'AssemblyScript',
    /address\[([0-9]+)?\]/,
    'Array<Address>',
    'toArray',
  ],
  ['EthereumValue', 'AssemblyScript', /bool\[([0-9]+)?\]/, 'Array<boolean>', 'toArray'],
  ['EthereumValue', 'AssemblyScript', /byte\[([0-9]+)?\]/, 'Array<Bytes>', 'toArray'],
  [
    'EthereumValue',
    'AssemblyScript',
    /bytes([0-9]+)?\[([0-9]+)?\]/,
    'Array<Bytes>',
    'toArray',
  ],
  ['EthereumValue', 'AssemblyScript', /int8\[([0-9]+)?\]/, 'Array<i8>', 'toArray'],
  ['EthereumValue', 'AssemblyScript', /uint8\[([0-9]+)?\]/, 'Array<u8>', 'toArray'],
  ['EthereumValue', 'AssemblyScript', /int16\[([0-9]+)?\]/, 'Array<i16>', 'toArray'],
  ['EthereumValue', 'AssemblyScript', /uint16\[([0-9]+)?\]/, 'Array<u16>', 'toArray'],
  ['EthereumValue', 'AssemblyScript', /int(24|32)\[([0-9]+)?\]/, 'Array<i32>', 'toArray'],
  [
    'EthereumValue',
    'AssemblyScript',
    /uint(24|32)\[([0-9]+)?\]/,
    'Array<u32>',
    'toArray',
  ],
  [
    'EthereumValue',
    'AssemblyScript',
    /int(40|48|56|64)\[([0-9]+)?\]/,
    'Array<i64>',
    'toArray',
  ],
  [
    'EthereumValue',
    'AssemblyScript',
    /uint(40|48|56|64)\[([0-9]+)?\]/,
    'Array<u64>',
    'toArray',
  ],
  [
    'EthereumValue',
    'AssemblyScript',
    /u?int(72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)\[([0-9]+)?\]/,
    'Array<BigInt>',
    'toArray',
  ],
  ['EthereumValue', 'AssemblyScript', /string\[([0-9]+)?\]/, 'Array<String>', 'toArray'],

  /**
   * AssemblyScript -> Value (scalar types)
   */
  ['AssemblyScript', 'Value', 'Address', 'Address', undefined, 'fromAddress'],

  /**
   * AssemblyScript -> Value (array types)
   */
  ['AssemblyScript', 'Value', 'Array<Address>', 'Array<Address>', undefined, 'fromArray'],
]
