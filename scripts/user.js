import { myKeyboard, myPlayer } from 'main';
export function onTick() {
    if (myKeyboard == null) {
        return;
    }
    if (myKeyboard.isKeyDown("ArrowLeft")) {
        if (myPlayer == null) {
            return;
        }
        myPlayer.step("left");
    }
}
export function onStart() {
    setInterval(ugorj, 2000);
}
function ugorj() {
    if (myPlayer == null) {
        return;
    }
    myPlayer.jump();
}
