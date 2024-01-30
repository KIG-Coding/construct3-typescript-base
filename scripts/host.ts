import type { IMyPlayer } from "./IMyPlayer";
import { MovementData } from "./MovementData";

export class Host{
    players: { [key: string]: any } = {}
    rt:IRuntime

    constructor(rt:IRuntime){
        this.rt = rt
        rt.addEventListener("tick", () => this.onTick());
    }

	onTick(){
		
	}

}
