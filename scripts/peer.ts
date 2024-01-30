import type { IMyPlayer } from "./IMyPlayer";
import { MovementData } from './MovementData';

export class Peer{
	rt:IRuntime;
	myMovement:MovementData = new MovementData()
	myKeyboard:IKeyboardObjectType<InstanceType.Keyboard>
	players: { [key: string]: any } = {} // IMyPlayer instances (extends player sprite)
	mp:IConstructProjectObjects["Multiplayer"]
	
	constructor(rt:IRuntime){
		this.rt = rt
		this.mp = rt.objects.Multiplayer;
		this.myKeyboard = rt.objects.Keyboard
		rt.addEventListener("tick", () => this.onTick());
		this.createPlayerForPeer(this.mp?.myId, true)
	}

	onTick(){
		this.listenToKeyboardAndSendMovementOnChange()
		//this.movePlayersOnEveryTick()
	}

    movePlayers(){
        for (let peerID in this.players){
            let player:IMyPlayer = this.players[peerID] as IMyPlayer
            if (player.movementData.left){
                player.behaviors.Platform.simulateControl("left")
            }
            if (player.movementData.right){
                player.behaviors.Platform.simulateControl("right")
            }
            if (player.movementData.jump){
                player.behaviors.Platform.simulateControl("jump")
            }
        }
    }	

    createPlayerForPeer(peerId:string, isMyPlayer:boolean){
        let p:IMyPlayer = this.rt.objects.player.createInstance("player",100, 100) as IMyPlayer
        p.behaviors.Platform.isDefaultControls = !isMyPlayer
        this.players[peerId] = p;
		let lblName:InstanceType.lblName = this.rt.objects.lblName.createInstance("player", 0, 0)
		lblName.text = peerId
		lblName.fontColor = [255, 255, 255]
		lblName.x = p.x - 30
		lblName.width = p.width + 60
		lblName.horizontalAlign = "center"
		p.addChild(lblName, {transformX: true, transformY: true})		
        p.movementData = new MovementData()
    }
	
	listenToKeyboardAndSendMovementOnChange(){
		let myMovementChanged:boolean = false;
		if (this.myKeyboard.isKeyDown("ArrowLeft") && !this.myMovement.left){this.myMovement.left = true; myMovementChanged = true}
		if (!this.myKeyboard.isKeyDown("ArrowLeft") && this.myMovement.left){this.myMovement.left = false; myMovementChanged = true}
		if (this.myKeyboard.isKeyDown("ArrowRight") && !this.myMovement.right){this.myMovement.right = true; myMovementChanged = true}
		if (!this.myKeyboard.isKeyDown("ArrowRight") && this.myMovement.right){this.myMovement.right = false; myMovementChanged = true}
		if (this.myKeyboard.isKeyDown("ArrowUp") && !this.myMovement.jump){this.myMovement.jump = true; myMovementChanged = true}
		if (!this.myKeyboard.isKeyDown("ArrowUp") && this.myMovement.jump){this.myMovement.jump = false; myMovementChanged = true}
		if (myMovementChanged){
			this.myMovement.peerID = this.mp.myId
			this.mp.sendPeerMessage(this.mp.hostId, this.myMovement.asObject())
		}
	}

    updatePlayerMovement(movement:MovementData){
		console.log("update player movement: " + movement.peerID)
        let p:IMyPlayer = this.players[movement.peerID] as IMyPlayer
        p.movementData = movement
		this.movePlayers()
    }
}





