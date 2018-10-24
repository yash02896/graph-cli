/**
 * EthereumValue -> AssemblyScript conversions
 */
const ETHEREUM_VALUE_TO_FROM_ASC = [
  [
    'EthereumValue',
    'AssemblyScript',
    'address',
    'Address',
    'toAddress',
    undefined,
    undefined,
    'fromAddress',
  ],
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
]

///**
// * EthereumValue -> AssemblyScript conversions
// */
//const ASC_TO_ETHEREUM_VALUE = [
//  ['AssemblyScript', 'EthereumValue', 'Address', 'address', undefined, 'fromAddress'],
//  ['AssemblyScript', 'EthereumValue', 'boolean', 'bool', undefined, 'fromBoolean'],
//  ['AssemblyScript', 'EthereumValue', 'Bytes', 'byte', undefined, 'fromBytes'],
//  ['AssemblyScript', 'EthereumValue', 'Bytes', /bytes([0-9]+)?/, undefined, 'fromBytes'],
//  ['AssemblyScript', 'EthereumValue', 'i8', 'int8', undefined, 'fromI8'],
//  ['AssemblyScript', 'EthereumValue', 'u8', 'uint8', undefined, 'fromU8'],
//  ['AssemblyScript', 'EthereumValue', 'i16', 'int16', undefined, 'fromI16'],
//  ['AssemblyScript', 'EthereumValue', 'u16', 'uint16', undefined, 'fromU16'],
//  ['AssemblyScript', 'EthereumValue', 'i32', /int(24|32)/, undefined, 'fromI32'],
//  ['AssemblyScript', 'EthereumValue', 'u32', /uint(24|32)/, undefined, 'fromU32'],
//  ['AssemblyScript', 'EthereumValue', 'i64', /int(40|48|56|64)/, undefined, 'fromI64'],
//  ['AssemblyScript', 'EthereumValue', 'u64', /uint(40|48|56|64)/, undefined, 'fromU64'],
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'BigInt',
//    /u?int(72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)/,
//    undefined,
//    'fromBigInt',
//  ],
//  ['AssemblyScript', 'EthereumValue', 'String', 'string', undefined, 'fromString'],
//
//  /**
//   * EthereumValue -> AssemblyScript (array types)
//   */
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'Array<Address>',
//    /address\[([0-9]+)?\]/,
//    'fromArray',
//  ],
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'Array<boolean>',
//    /bool\[([0-9]+)?\]/,
//    undefined,
//    'fromArray',
//  ],
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'Array<Bytes>',
//    /byte\[([0-9]+)?\]/,
//    undefined,
//    'fromArray',
//  ],
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'Array<Bytes>',
//    /bytes([0-9]+)?\[([0-9]+)?\]/,
//    'fromArray',
//  ],
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'Array<i8>',
//    /int8\[([0-9]+)?\]/,
//    undefined,
//    'fromArray',
//  ],
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'Array<u8>',
//    /uint8\[([0-9]+)?\]/,
//    undefined,
//    'fromArray',
//  ],
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'Array<i16>',
//    /int16\[([0-9]+)?\]/,
//    undefined,
//    'fromArray',
//  ],
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'Array<u16>',
//    /uint16\[([0-9]+)?\]/,
//    undefined,
//    'fromArray',
//  ],
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'Array<i32>',
//    /int(24|32)\[([0-9]+)?\]/,
//    undefined,
//    'fromArray',
//  ],
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'Array<u32>',
//    /uint(24|32)\[([0-9]+)?\]/,
//    undefined,
//    'fromArray',
//  ],
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'Array<i64>',
//    /int(40|48|56|64)\[([0-9]+)?\]/,
//    undefined,
//    'fromArray',
//  ],
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'Array<u64>',
//    /uint(40|48|56|64)\[([0-9]+)?\]/,
//    undefined,
//    'fromArray',
//  ],
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'Array<BigInt>',
//    /u?int(72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)\[([0-9]+)?\]/,
//    undefined,
//    'fromArray',
//  ],
//  [
//    'AssemblyScript',
//    'EthereumValue',
//    'Array<String>',
//    /string\[([0-9]+)?\]/,
//    undefined,
//    'fromArray',
//  ],
//]

const VALUE_TO_FROM_ASC = [
  [
    'Value',
    'AssemblyScript',
    'Address',
    'Address',
    'toAddress',
    undefined,
    undefined,
    'fromAddress',
  ],
  [
    'Value',
    'AssemblyScript',
    'Array<Address>',
    'Array<Address>',
    'toArray',
    undefined,
    undefined,
    'fromArray',
  ],
]

/**
 * Type conversions:
 * from domain | to domain | from type | to type | instance method | static method
 */
module.exports = [
  ...ETHEREUM_VALUE_TO_FROM_ASC,
  //...ASC_TO_ETHEREUM_VALUE,
  ...VALUE_TO_FROM_ASC,
  // ...VALUE_TO_ASC
]
