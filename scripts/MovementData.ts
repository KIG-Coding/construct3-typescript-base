export class MovementData{
    public left:boolean
    public right:boolean
    public jump:boolean
    public peerID:string

    constructor(l?:boolean, r?:boolean, j?:boolean) {
        this.peerID = ""
        this.left = l ? l : false
        this.right = r ? r : false
        this.jump = j ? j : false
    }

    asObject(){
        return {left: this.left, right: this.right, jump: this.jump, peerID: this.peerID}
    }
}