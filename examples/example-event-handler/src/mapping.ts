import 'allocator/arena'
export { allocate_memory }

import { store, crypto, Entity, Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { ExampleContract, ExampleEvent } from './types/ExampleSubgraph/ExampleContract'
import { ExampleEntity } from './types/schema'

export function handleExampleEvent(event: ExampleEvent): void {
  let entity = new ExampleEntity()

  // Entity field access

  entity.optionalBoolean = true
  entity.optionalBoolean = false
  entity.optionalBooleanList = [true, false]
  entity.optionalBooleanList = null

  let optionalBoolean: boolean = entity.optionalBoolean
  let optionalBooleanList: Array<boolean> | null = entity.optionalBooleanList

  entity.requiredBoolean = true
  entity.requiredBoolean = false
  entity.requiredBooleanList = [true, false]

  let requiredBoolean: boolean = entity.requiredBoolean
  let requiredBooleanList: Array<boolean> = entity.requiredBooleanList

  entity.optionalString = 'hello'
  entity.optionalString = null
  entity.optionalStringList = ['hello', 'world']
  entity.optionalStringList = null

  let optionalString: string | null = entity.optionalString
  let optionalStringList: Array<string> | null = entity.optionalStringList

  entity.requiredString = 'hello'
  entity.requiredStringList = ['hello', 'world']

  let requiredString: string = entity.requiredString
  let requiredStringList: Array<string> = entity.requiredStringList

  entity.optionalInt = 128
  entity.optionalInt = -500
  entity.optionalInt = null
  entity.optionalIntList = [128, -500]
  entity.optionalIntList = null

  let optionalInt: i32 | null = entity.optionalInt
  let optionalIntList: Array<i32> | null = entity.optionalIntList

  entity.requiredInt = 128
  entity.requiredInt = -500
  entity.requiredIntList = [128, -500]

  let requiredInt: i32 = entity.requiredInt
  let requiredIntList: Array<i32> = entity.requiredIntList

  entity.optionalBigInt = new BigInt()
  entity.optionalBigInt = null
  entity.optionalBigIntList = [new BigInt(), new BigInt()]
  entity.optionalBigIntList = null

  let optionalBigInt: BigInt | null = entity.optionalBigInt
  let optionalBigIntList: Array<BigInt> | null = entity.optionalBigIntList

  entity.requiredBigInt = new BigInt()
  entity.requiredBigIntList = [new BigInt(), new BigInt()]

  let requiredBigInt: BigInt = entity.requiredBigInt
  let requiredBigIntList: Array<BigInt> = entity.requiredBigIntList

  entity.optionalBytes = new Bytes()
  entity.optionalBytes = null
  entity.optionalBytesList = [new Bytes(), new Bytes()]
  entity.optionalBytesList = null

  let optionalBytes: Bytes | null = entity.optionalBytes
  let optionalBytesList: Array<Bytes> | null = entity.optionalBytesList

  entity.requiredBytes = new Bytes()
  entity.requiredBytesList = [new Bytes(), new Bytes()]

  let requiredBytes: Bytes = entity.requiredBytes
  let requiredBytesList: Array<Bytes> = entity.requiredBytesList

  entity.optionalReference = 'some-id'
  entity.optionalReference = null
  entity.optionalReferenceList = ['some-id', 'other-id']
  entity.optionalReferenceList = null

  let optionalReference: string | null = entity.optionalReference
  let optionalReferenceList: Array<string> | null = entity.optionalReferenceList

  entity.requiredReference = 'some-id'
  entity.requiredReferenceList = ['some-id', 'other-id']

  let requiredReference: string = entity.requiredReference
  let requiredReferenceList: Array<string> = entity.requiredReferenceList

  // Smart contract calls

  let contract = ExampleContract.bind(event.address)
  entity.requiredBytes = contract.getAndReturnAddress(entity.requiredBytes as Address)
  entity.requiredBoolean = contract.getAndReturnBool(entity.requiredBoolean)
  entity.requiredBytes = contract.getAndReturnByte(entity.requiredBytes)
  entity.requiredBytes = contract.getAndReturnBytes1(entity.requiredBytes)
  entity.requiredBytes = contract.getAndReturnBytes32(entity.requiredBytes)
  entity.requiredInt = contract.getAndReturnInt8(entity.requiredInt)
  entity.requiredInt = contract.getAndReturnInt16(entity.requiredInt)
  entity.requiredInt = contract.getAndReturnInt24(entity.requiredInt)
  entity.requiredInt = contract.getAndReturnInt32(entity.requiredInt)

  // Store access

  store.set('ExampleEntity', 'example id', entity)
  store.get('ExampleEntity', 'example id')
  store.remove('ExampleEntity', 'example id')
}
