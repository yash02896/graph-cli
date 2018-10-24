const TYPE_CONVERSIONS = require('./conversions')

/**
 * Looks up conversion details to convert a typed value from one domain
 * to typed value in another domain.
 */
const conversionInfo = (fromDomain, toDomain, fromType, toType) => {
  let conversion = TYPE_CONVERSIONS.find(
    conversion =>
      conversion[0] === fromDomain &&
      conversion[1] === toDomain &&
      (fromType !== undefined
        ? fromType.match(conversion[2])
        : toType !== undefined
          ? toType.match(conversion[3])
          : false)
  )

  if (conversion === undefined) {
    if (fromType !== undefined) {
      throw new Error(
        `${fromDomain} -> ${toDomain} conversion from type '${fromType}' not supported`
      )
    } else {
      throw new Error(
        `${fromDomain} -> ${toDomain} conversion to type '${toType}' not supported`
      )
    }
  }

  return {
    fromDomain: conversion[0],
    toDomain: conversion[1],
    fromType: conversion[2],
    toType: conversion[3],
    toInstanceMethod: conversion[4],
    toStaticMethod: conversion.length > 5 ? conversion[5] : undefined,
    fromInstanceMethod: conversion.length > 6 ? conversion[6] : undefined,
    fromStaticMethod: conversion.length > 7 ? conversion[7] : undefined,
  }
}

/**
 * Generates code that converts a typed value from one domain into a
 * typed value in another domain.
 */
const convertFromType = (fromDomain, toDomain, fromType, code) => {
  let conversion = conversionInfo(fromDomain, toDomain, fromType, undefined)

  console.log('CONVERT FROM TYPE', fromDomain, toDomain, fromType)
  console.log('CONVERSION:', conversion)

  return conversion.toStaticMethod !== undefined
    ? `${conversion.toDomain}.${conversion.toStaticMethod}(${code})`
    : `${code}.${conversion.toInstanceMethod}()`
}

/**
 * Generates code that converts a typed value from one domain into a
 * typed value in another domain.
 */
const convertToType = (fromDomain, toDomain, toType, code) => {
  let conversion = conversionInfo(fromDomain, toDomain, undefined, toType)

  return conversion.fromStaticMethod !== undefined
    ? `${conversion.toDomain}.${conversion.fromStaticMethod}(${code})`
    : `${code}.${conversion.fromInstanceMethod}()`
}

/**
 * Given two domains and a type, returns the corresponding type in
 * the other domain.
 */
const typeFor = (fromDomain, toDomain, fromType) =>
  conversionInfo(fromDomain, toDomain, fromType).toType

// Helpers

const ethereumToAsc = (fromType, code) =>
  convertFromType('EthereumValue', 'AssemblyScript', fromType, code)

const ascToEthereum = (toType, code) =>
  convertToType('EthereumValue', 'AssemblyScript', toType, code)

const valueToAsc = (fromType, code) =>
  convertFromType('Value', 'AssemblyScript', fromType, code)

const ascToValue = (fromType, code) =>
  convertToType('Value', 'AssemblyScript', fromType, code)

const ascTypeFromEthereum = fromType =>
  conversionInfo('EthereumValue', 'AssemblyScript', fromType).toType

module.exports = {
  ethereumToAsc,
  ascToEthereum,
  valueToAsc,
  ascToValue,
  conversionInfo,
  typeFor,
  ascTypeFromEthereum,
}
