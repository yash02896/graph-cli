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
}
