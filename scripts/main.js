(()=>{"use strict";class t{players={};rt;constructor(t){this.rt=t,t.addEventListener("tick",(()=>this.onTick()))}onTick(){}}class e{left;right;jump;peerID;constructor(t,e,s){this.peerID="",this.left=t||!1,this.right=e||!1,this.jump=s||!1}asObject(){return{left:this.left,right:this.right,jump:this.jump,peerID:this.peerID}}}class s{rt;myMovement=new e;myKeyboard;players={};mp;constructor(t){this.rt=t,this.mp=t.objects.Multiplayer,this.myKeyboard=t.objects.Keyboard,t.addEventListener("tick",(()=>this.onTick())),this.createPlayerForPeer(this.mp?.myId,!0)}onTick(){this.listenToKeyboardAndSendMovementOnChange()}movePlayers(){for(let t in this.players){let e=this.players[t];e.movementData.left&&e.behaviors.Platform.simulateControl("left"),e.movementData.right&&e.behaviors.Platform.simulateControl("right"),e.movementData.jump&&e.behaviors.Platform.simulateControl("jump")}}createPlayerForPeer(t,s){let o=this.rt.objects.player.createInstance("player",100,100);o.behaviors.Platform.isDefaultControls=!s,this.players[t]=o;let i=this.rt.objects.lblName.createInstance("player",0,0);i.text=t,i.fontColor=[255,255,255],i.x=o.x-30,i.width=o.width+60,i.horizontalAlign="center",o.addChild(i,{transformX:!0,transformY:!0}),o.movementData=new e}listenToKeyboardAndSendMovementOnChange(){let t=!1;this.myKeyboard.isKeyDown("ArrowLeft")&&!this.myMovement.left&&(this.myMovement.left=!0,t=!0),!this.myKeyboard.isKeyDown("ArrowLeft")&&this.myMovement.left&&(this.myMovement.left=!1,t=!0),this.myKeyboard.isKeyDown("ArrowRight")&&!this.myMovement.right&&(this.myMovement.right=!0,t=!0),!this.myKeyboard.isKeyDown("ArrowRight")&&this.myMovement.right&&(this.myMovement.right=!1,t=!0),this.myKeyboard.isKeyDown("ArrowUp")&&!this.myMovement.jump&&(this.myMovement.jump=!0,t=!0),!this.myKeyboard.isKeyDown("ArrowUp")&&this.myMovement.jump&&(this.myMovement.jump=!1,t=!0),t&&(this.myMovement.peerID=this.mp.myId,this.mp.sendPeerMessage(this.mp.hostId,this.myMovement.asObject()))}updatePlayerMovement(t){console.log("update player movement: "+t.peerID),this.players[t.peerID].movementData=t,this.movePlayers()}}class o{rt;hostIndicator;txtDebug;mp;hostApp;peerApp;constructor(t){this.rt=t,t.addEventListener("beforeprojectstart",(()=>this.OnBeforeProjectStart())),t.addEventListener("afterprojectstart",(()=>this.OnAfterProjectStart()))}OnAfterProjectStart(){this.txtDebug=this.rt.objects.txtDebug.getFirstInstance(),this.hostIndicator=this.rt.objects.hostIndicator.getFirstInstance(),this.mp=this.rt.objects.Multiplayer,this.mp.signalling.addEventListener("connected",this.onConnected.bind(this)),this.mp.signalling.connect("wss://multiplayer.construct.net")}onConnected(){if(null!=this.mp){this.mp.addEventListener("peerconnect",this.onPeerConnected.bind(this)),this.mp.addEventListener("message",this.onMessage.bind(this));var e=this;this.mp.signalling.addEventListener("login",(function(o){null!=e.mp&&(e.mp.signalling.addEventListener("join",(function(o){null!=e.hostIndicator&&null!=e.mp&&(e.debugOut("I joined --\x3e "+e.mp.myId),e.hostIndicator.isVisible=!0,e.peerApp=new s(e.rt),e.mp.isHost?(console.log("on conn - I am host"),e.hostIndicator.setAnimation("HOST"),e.hostApp=new t(e.rt)):(console.log("on conn - I am peer"),e.hostIndicator.setAnimation("PEER")))})),e.mp.signalling.joinRoom("szakkor-gaborv","default","room1"))})),this.mp.signalling.login("asd")}}onMessage(t){if(this.debugOut("Message came from: "+t.fromId),null==this.mp)return;let e=t.message;if(console.log(e),this.mp.hostId==this.mp.myId)if(t.fromId!=this.mp.hostId)console.log("hosttól hostnak:",t);else{if(null==this.hostApp)return;this.mp.hostBroadcastMessage(this.mp.hostId,JSON.stringify(e))}this.peerApp?.updatePlayerMovement(e)}onPeerConnected(t){if(this.debugOut("Peer connected: "+t.peerId+"("+t.peerAlias+")"),null!=this.mp&&null!=this.peerApp&&(this.peerApp.createPlayerForPeer(t.peerId,!1),t.peerId!=this.mp.hostId)){let e={peerID:t.peerId,message:"playerConnected"};this.mp.hostBroadcastMessage(this.mp.hostId,e)}}async OnBeforeProjectStart(){}debugOut(t){null!=this.txtDebug&&(console.log(t),this.txtDebug.text+=t+"\n")}}runOnStartup((async t=>{new o(t)}))})();