
import Phaser from "phaser";

function preload (){
 
}

function create (){
  this.helloWorld = this.add.text(
    this.cameras.main.centerX,
    this.cameras.main.centerY,
    "Hello World",
    { font: "40px Arial",  fill: "#ffffff" }
  );
  this.helloWorld.setOrigin(0.5);
}

function update (obj){
  this.helloWorld.angle += 1;
}
function init(){
  this.cameras.main.setBackgroundColor("#24252A");
}
export const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 80,
  scene: {
      preload: preload,
      create: create,
      update: update,
      init: init
  }
}
