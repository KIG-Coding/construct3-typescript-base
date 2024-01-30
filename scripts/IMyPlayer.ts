import { MovementData } from "./MovementData"

export interface IMyPlayer extends InstanceType.player{
	jump():void
	step(direction:SimulateControlTypePlatform):void
	movementData:MovementData
}
