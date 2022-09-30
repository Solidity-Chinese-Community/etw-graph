import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  Approval,
  ApprovalForAll,
  Transfer
} from "../generated/Contract/Contract"
import { EventLog, ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {

  let entity = ExampleEntity.load(event.transaction.from.toHex())


  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    entity.count = BigInt.zero()
  }

  entity.count = entity.count.plus(BigInt.fromI32(1)) 

  entity.owner = event.params.owner
  entity.spender = event.params.spender

  entity.save()

}

export function handleApprovalForAll(event: ApprovalForAll): void {
  let log =  EventLog.load('ApprovalForAll');
  if(!log){
    log = new EventLog('ApprovalForAll');
    log.count = BigInt.fromI32(1);
  } 
  if(log) log.count = log.count.plus(BigInt.fromI32(1)) ;
  log.action = 'ApprovalForAll'
  log.save();
}

export function handleTransfer(event: Transfer): void {
  let log =  EventLog.load('Transfer');
  if(!log){
    log = new EventLog('Transfer');
    log.count = BigInt.fromI32(1);
  } 
  if(log) log.count = log.count.plus(BigInt.fromI32(1)) ;
  log.action = 'Transfer'
  log.save();
}
