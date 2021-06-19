const disambiguateNames = ({ values, getName, setName }) => {
  const collisionCounter = new Map()
  return values.map((value, index) => {
    const name = getName(value, index)
    const counter = collisionCounter.get(name)
    if (counter === undefined) {
      collisionCounter.set(name, 1)
      return setName(value, name)
    } else {
      collisionCounter.set(name, counter + 1)
      return setName(value, `${name}${counter}`)
    }
  })
}

const isTupleType = t => {
  return t === 'tuple'
}

const containsTupleType = t => {
  return isTupleType(t) || isTupleArrayType(t)
}

const isTupleArrayType = t => {
  return t.match(/^tuple\[([0-9]+)?\]$/)
}

const unrollTuple = ({ path, index: _index, value }) =>
  value.components.reduce((acc, component, index) => {
    const name = component.name || `value${index}`
    return acc.concat(
      component.type === 'tuple'
        ? unrollTuple({
            path: [...path, name],
            index,
            value: component,
          })
        : [{ path: [...path, name], type: component.type }],
    )
  }, [])

module.exports = {
  containsTupleType,
  disambiguateNames,
  isTupleType,
  isTupleArrayType,
  unrollTuple,
}
