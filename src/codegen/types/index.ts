import immutable from 'immutable'

import TYPE_CONVERSIONS from './conversions'

// Conversion utilities

const conversionsForTypeSystems = (fromTypeSystem, toTypeSystem) => {
  const conversions = TYPE_CONVERSIONS.getIn([fromTypeSystem, toTypeSystem])
  if (conversions === undefined) {
    throw new Error(
      `Conversions from '${fromTypeSystem}' to '${toTypeSystem}' are not supported`,
    )
  }
  return conversions
}

const objectifyConversion = (fromTypeSystem, toTypeSystem, conversion) => {
  return immutable.fromJS({
    from: {
      typeSystem: fromTypeSystem,
      type: conversion.get(0),
    },
    to: {
      typeSystem: toTypeSystem,
      type: conversion.get(1),
    },
    convert: conversion.get(2),
  })
}

const findConversionFromType = (fromTypeSystem, toTypeSystem, fromType) => {
  const conversions = conversionsForTypeSystems(fromTypeSystem, toTypeSystem)

  const conversion = conversions.find(conversion =>
    typeof conversion.get(0) === 'string'
      ? conversion.get(0) === fromType
      : fromType.match(conversion.get(0)),
  )

  if (conversion === undefined) {
    throw new Error(
      `Conversion from '${fromTypeSystem}' to '${toTypeSystem}' for ` +
        `source type '${fromType}' is not supported`,
    )
  }

  return objectifyConversion(fromTypeSystem, toTypeSystem, conversion)
}

const findConversionToType = (fromTypeSystem, toTypeSystem, toType) => {
  const conversions = conversionsForTypeSystems(fromTypeSystem, toTypeSystem)

  const conversion = conversions.find(conversion =>
    typeof conversion.get(1) === 'string'
      ? conversion.get(1) === toType
      : toType.match(conversion.get(1)),
  )

  if (conversion === undefined) {
    throw new Error(
      `Conversion from '${fromTypeSystem}' to '${toTypeSystem}' for ` +
        `target type '${toType}' is not supported`,
    )
  }

  return objectifyConversion(fromTypeSystem, toTypeSystem, conversion)
}

// High-level type system API

const ascTypeForEthereum = ethereumType =>
  findConversionFromType('ethereum', 'AssemblyScript', ethereumType).getIn(['to', 'type'])

const ethereumTypeForAsc = ascType =>
  findConversionFromType('AssemblyScript', 'ethereum', ascType).getIn(['to', 'type'])

const ethereumToAsc = (code, ethereumType, internalType) =>
  findConversionFromType('ethereum', 'AssemblyScript', ethereumType).get('convert')(
    code,
    internalType,
  )

const ethereumFromAsc = (code, ethereumType) =>
  findConversionToType('AssemblyScript', 'ethereum', ethereumType).get('convert')(code)

const ascTypeForValue = valueType =>
  findConversionFromType('Value', 'AssemblyScript', valueType).getIn(['to', 'type'])

const valueTypeForAsc = ascType =>
  findConversionFromType('AssemblyScript', 'Value', ascType).getIn(['to', 'type'])

const valueToAsc = (code, valueType) =>
  findConversionFromType('Value', 'AssemblyScript', valueType).get('convert')(code)

const valueFromAsc = (code, valueType) =>
  findConversionToType('AssemblyScript', 'Value', valueType).get('convert')(code)

module.exports = {
  // ethereum <-> AssemblyScript
  ascTypeForEthereum,
  ethereumTypeForAsc,
  ethereumToAsc,
  ethereumFromAsc,

  // Value <-> AssemblyScript
  ascTypeForValue,
  valueTypeForAsc,
  valueToAsc,
  valueFromAsc,
}
