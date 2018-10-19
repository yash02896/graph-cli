const TYPE_CONVERSIONS = require('./conversions')

/**
 * Looks up conversion details to convert a typed value from one domain
 * to typed value in another domain.
 */
const conversionInfo = (fromDomain, toDomain, fromType) => {
  let conversion = TYPE_CONVERSIONS.find(
    conversion =>
      conversion[0] === fromDomain &&
      conversion[1] === toDomain &&
      fromType.match(conversion[2])
  )

  if (conversion === undefined) {
    throw new Error(
      `${fromDomain} -> ${toDomain} conversion for type '${fromType}' not supported`
    )
  }

  return {
    fromDomain: conversion[0],
    toDomain: conversion[1],
    fromType: conversion[2],
    toType: conversion[3],
    instanceMethod: conversion[4],
    staticMethod: conversion.length > 5 ? conversion[5] : undefined,
  }
}

/**
 * Generates code that converts a typed value from one domain into a
 * typed value in another domain.
 */
const convert = (fromDomain, toDomain, fromType, code) => {
  let conversion = conversionInfo(fromDomain, toDomain, fromType)

  return conversion.staticMethod !== undefined
    ? `${conversion.toDomain}.${conversion.staticMethod}(${code})`
    : `${code}.${conversion.instanceMethod}()`
}

module.exports = {
  convert,
  conversionInfo,
}
