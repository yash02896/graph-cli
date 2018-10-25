const immutable = require('immutable')

/**
 * EthereumValue -> AssemblyScript conversions
 */
const ETHEREUM_VALUE_TO_ASSEMBLYSCRIPT = [
  ['address', 'Address', code => `${code}.toAddress()`],
  ['bool', 'boolean', code => `${code}.toBoolean()`],
  ['byte', 'Bytes', code => `${code}.toBytes()`],
  [
    /^bytes(1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32)?$/,
    'Bytes',
    code => `${code}.toBytes()`,
  ],
  [/^int(8|16|24|32)$/, 'i32', code => `${code}.toI32()`],
  [/^uint(8|16|24|32)$/, 'u32', code => `${code}.toU32()`],
  [
    /u?int(40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)/,
    'BigInt',
    code => `${code}.toBigInt()`,
  ],
  ['string', 'String', code => `${code}.toString()`],
  [/address\[([0-9]+)?\]/, 'Array<Address>', code => `${code}.toAddressArray()`],
  //[/bool\[([0-9]+)?\]/, 'Array<boolean>', code => `${code}.toBooleanArray()`],
  //[/byte\[([0-9]+)?\]/, 'Array<Bytes>', 'toBytesArray'],
  //[/bytes([0-9]+)?\[([0-9]+)?\]/, 'Array<Bytes>', 'toBytesArray'],
  //[/int(8|16|24|32)\[([0-9]+)?\]/, 'Array<i32>', 'toI32Array'],
  //[/uint(8|16|24|32)\[([0-9]+)?\]/, 'Array<u32>', 'toU32Array'],
  //[
  //  /u?int(40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)\[([0-9]+)?\]/,
  //  'Array<BigInt>',
  //  'toBigIntArray',
  //],
  //[/string\[([0-9]+)?\]/, 'Array<String>', 'toStringArray'],
]

/**
 * AssemblyScript -> EthereumValue conversions
 */
const ASSEMBLY_SCRIPT_TO_ETHEREUM_VALUE = [
  ['Address', 'address', code => `EthereumValue.fromAddress(${code})`],
  ['boolean', 'bool', code => `EthereumValue.fromBool(${code})`],
  ['Bytes', 'byte', code => `EthereumValue.fromBytes(${code})`],
  [
    'Bytes',
    /^bytes(1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32)?$/,
    code => `EthereumValue.fromBytes(${code})`,
  ],
  ['i32', /^int(8|16|24|32)$/, code => `EthereumValue.fromI32(${code})`],
  ['u32', /^uint(8|16|24|32)$/, code => `EthereumValue.fromU32(${code})`],
  [
    'BigInt',
    /u?int(40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)/,
    code => `EthereumValue.fromBigInt(${code})`,
  ],
  ['String', 'string', code => `EthereumValue.fromString(${code})`],
]

/**
 * Type conversions
 */
module.exports = immutable.fromJS({
  EthereumValue: {
    AssemblyScript: ETHEREUM_VALUE_TO_ASSEMBLYSCRIPT,
  },
  AssemblyScript: {
    EthereumValue: ASSEMBLY_SCRIPT_TO_ETHEREUM_VALUE,
  },
})
