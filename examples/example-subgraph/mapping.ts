import 'allocator/arena'
export { allocate_memory }

import { store, Address, Bytes, Entity, Value } from '@graphprotocol/graph-ts'
import { ExampleEvent } from './types/ExampleSubgraph/ExampleContract'
import { ExampleEntity } from './types/schema'

export function handleExampleEvent(event: ExampleEvent): void {
    let entity = new ExampleEntity()
    entity.exampleAttribute = event.params.exampleParam

    store.set('ExampleEntity', 'example id', entity)
}