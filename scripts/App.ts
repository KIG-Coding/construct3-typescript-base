import { MovementData } from './MovementData';
import { Host } from './host';
import { Peer } from './peer';

class App{
	rt:IRuntime
	hostIndicator?:InstanceType.hostIndicator
	txtDebug?:InstanceType.txtDebug
	mp?:IConstructProjectObjects["Multiplayer"]
	hostApp?:Host;
	peerApp?:Peer;

	constructor(rt:IRuntime){
		this.rt = rt
		rt.addEventListener("beforeprojectstart", () => this.OnBeforeProjectStart());
		rt.addEventListener("afterprojectstart", () => this.OnAfterProjectStart());	
	}

	OnAfterProjectStart(){
		this.txtDebug = this.rt.objects.txtDebug.getFirstInstance() as InstanceType.txtDebug
		this.hostIndicator = this.rt.objects.hostIndicator.getFirstInstance() as InstanceType.hostIndicator	
		// connect
		this.mp = this.rt.objects.Multiplayer;
		this.mp.signalling.addEventListener("connected", this.onConnected.bind(this))
		this.mp.signalling.connect("wss://multiplayer.construct.net")
	}

	onConnected(){
		if (this.mp == undefined){return}
		this.mp.addEventListener("peerconnect", this.onPeerConnected.bind(this))
		this.mp.addEventListener("message", this.onMessage.bind(this))
		var me:App = this
		this.mp.signalling.addEventListener("login", function(a){
			if (me.mp == undefined){return}
			me.mp.signalling.addEventListener("join", function(evt):void{
				if (me.hostIndicator == undefined){return}
				if (me.mp == undefined){return}
				me.debugOut("I joined --> " + me.mp.myId)
				me.hostIndicator.isVisible = true;
				me.peerApp = new Peer(me.rt)
				if (me.mp.isHost){
					console.log("on conn - I am host")
					me.hostIndicator.setAnimation("HOST")
					me.hostApp = new Host(me.rt)
				} else {
					console.log("on conn - I am peer")
					me.hostIndicator.setAnimation("PEER")
					//console.log("kuldok")
				}
			});
			me.mp.signalling.joinRoom("szakkor-gaborv", "default", "room1")
		});
		this.mp.signalling.login("asd")
	}


	onMessage(evt:MultiplayerMessageEvent){
		this.debugOut("Message came from: " + evt.fromId)
        if (this.mp == undefined){return}
		let data:unknown = evt.message
		let peerMessage = data as MovementData
		console.log(peerMessage)
		if (this.mp.hostId == this.mp.myId){
			// ha host vagyok
			if (evt.fromId != this.mp.hostId){
				// ha hosttól jött az üzenet
				console.log("hosttól hostnak:", evt)
			}else{
				// ha másik peer-től jött
				if (this.hostApp == undefined){return}
				this.mp.hostBroadcastMessage(this.mp.hostId, JSON.stringify(peerMessage))
			}
		}
		
		this.peerApp?.updatePlayerMovement(peerMessage)
	}

	onPeerConnected(evt:MultiplayerPeerEvent){
		this.debugOut("Peer connected: " + evt.peerId +  "(" + evt.peerAlias + ")")
		if (this.mp == undefined){return}
		if (this.peerApp == undefined){return}
		this.peerApp.createPlayerForPeer(evt.peerId, false)

		if (evt.peerId != this.mp.hostId){
			let msg = {				peerID: evt.peerId,				message: "playerConnected"			}
			this.mp.hostBroadcastMessage(this.mp.hostId, msg)
		}
	}

	async OnBeforeProjectStart(){
		//
	}

	debugOut(msg:string){
		if (this.txtDebug == undefined){return;}
		console.log(msg)
		this.txtDebug.text += msg + "\n"
	}
}

export {App}