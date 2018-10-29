import {
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ExampleEvent extends EthereumEvent {
  get params(): ExampleEventParams {
    return new ExampleEventParams(this);
  }
}

export class ExampleEventParams {
  _event: ExampleEvent;

  constructor(event: ExampleEvent) {
    this._event = event;
  }

  get exampleParam(): string {
    return this._event.parameters[0].value.toString();
  }
}

export class ExampleContract extends SmartContract {
  static bind(address: Address): ExampleContract {
    return new ExampleContract("ExampleContract", address);
  }

  getAndReturnAddress(x: Address): Address {
    let result = super.call("getAndReturnAddress", [
      EthereumValue.fromAddress(x)
    ]);
    return result[0].toAddress();
  }

  getAndReturnString(x: string): string {
    let result = super.call("getAndReturnString", [
      EthereumValue.fromString(x)
    ]);
    return result[0].toString();
  }

  getAndReturnBool(x: boolean): boolean {
    let result = super.call("getAndReturnBool", [EthereumValue.fromBoolean(x)]);
    return result[0].toBoolean();
  }

  getAndReturnByte(x: Bytes): Bytes {
    let result = super.call("getAndReturnByte", [EthereumValue.fromBytes(x)]);
    return result[0].toBytes();
  }

  getAndReturnBytes1(x: Bytes): Bytes {
    let result = super.call("getAndReturnBytes1", [EthereumValue.fromBytes(x)]);
    return result[0].toBytes();
  }

  getAndReturnBytes32(x: Bytes): Bytes {
    let result = super.call("getAndReturnBytes32", [
      EthereumValue.fromBytes(x)
    ]);
    return result[0].toBytes();
  }

  getAndReturnInt8(x: i32): i32 {
    let result = super.call("getAndReturnInt8", [EthereumValue.fromI32(x)]);
    return result[0].toI32();
  }

  getAndReturnInt16(x: i32): i32 {
    let result = super.call("getAndReturnInt16", [EthereumValue.fromI32(x)]);
    return result[0].toI32();
  }

  getAndReturnInt24(x: i32): i32 {
    let result = super.call("getAndReturnInt24", [EthereumValue.fromI32(x)]);
    return result[0].toI32();
  }

  getAndReturnInt32(x: i32): i32 {
    let result = super.call("getAndReturnInt32", [EthereumValue.fromI32(x)]);
    return result[0].toI32();
  }

  getAndReturnInt40(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt40", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt48(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt48", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt56(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt56", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt64(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt64", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt72(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt72", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt80(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt80", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt88(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt88", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt96(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt96", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt104(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt104", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt112(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt112", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt120(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt120", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt128(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt128", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt136(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt136", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt144(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt144", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt152(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt152", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt160(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt160", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt168(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt168", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt176(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt176", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt184(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt184", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt192(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt192", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt200(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt200", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt208(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt208", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt216(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt216", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt224(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt224", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt232(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt232", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt240(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt240", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt248(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt248", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnInt256(x: BigInt): BigInt {
    let result = super.call("getAndReturnInt256", [
      EthereumValue.fromSignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint8(x: u32): u32 {
    let result = super.call("getAndReturnUint8", [EthereumValue.fromU32(x)]);
    return result[0].toU32();
  }

  getAndReturnUint16(x: u32): u32 {
    let result = super.call("getAndReturnUint16", [EthereumValue.fromU32(x)]);
    return result[0].toU32();
  }

  getAndReturnUint24(x: u32): u32 {
    let result = super.call("getAndReturnUint24", [EthereumValue.fromU32(x)]);
    return result[0].toU32();
  }

  getAndReturnUint32(x: u32): u32 {
    let result = super.call("getAndReturnUint32", [EthereumValue.fromU32(x)]);
    return result[0].toU32();
  }

  getAndReturnUint40(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint40", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint48(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint48", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint56(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint56", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint64(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint64", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint72(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint72", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint80(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint80", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint88(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint88", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint96(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint96", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint104(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint104", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint112(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint112", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint120(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint120", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint128(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint128", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint136(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint136", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint144(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint144", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint152(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint152", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint160(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint160", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint168(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint168", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint176(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint176", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint184(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint184", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint192(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint192", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint200(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint200", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint208(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint208", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint216(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint216", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint224(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint224", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint232(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint232", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint240(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint240", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint248(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint248", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }

  getAndReturnUint256(x: BigInt): BigInt {
    let result = super.call("getAndReturnUint256", [
      EthereumValue.fromUnsignedBigInt(x)
    ]);
    return result[0].toBigInt();
  }
}
