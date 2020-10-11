
import * as PIXI from 'pixi.js'
const spriteImgIdle = require("@/assets/idle-Sheet.png");
const base = new PIXI.BaseTexture(spriteImgIdle);
const texture = new PIXI.Texture(base);
const sprite = new PIXI.Sprite(texture);
export class GameAnimation{
    constructor(){
        this.playerSheet = {};
        this.player;
        this.animIdleCurr = 0;
        this.app;
    }
    init(){
        this.app = new PIXI.Application({
            width:200,
            height:40,
            transparent:true
        });
        this.app.loader.add("ninja",spriteImgIdle);
        return app;
    }
    onKeyDown(e){
      console.log(e.keyCode)
    }
    onKeyup(){
      console.log(e.keyCode)
    }
    gameLoop(delta){
        if(!this.player.playing){
            if(this.animIdleCurr >= Object.keys(this.playerSheet).length){
                this.animIdleCurr = 0;
              }
            if(this.animIdleCurr < (Object.keys(this.playerSheet).length)){
              this.player.animationSpeed = 1;
              this.player.textures = this.playerSheet[`idle${this.animIdleCurr + 1}`];
              this.player.play();
              this.animIdleCurr++;
        
            }
        }
    }
    createPlayerChar(){
        this.player = new PIXI.AnimatedSprite(this.playerSheet.idle1);
     
        this.player.animationSpeed = 2;
        this.player.loop = false;
        this.player.x = 0;
        this.player.y = 0;
        
        this.app.stage.addChild(this.player);
        this.player.scale.set(1.1);
        this.player.play();
        
    }
    createPlayerSheet(){
  
      let ssheet = new PIXI.BaseTexture.from(this.app.loader.resources["ninja"].url);
      let w = 25;
      let h = 25;

      this.playerSheet["idle1"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w + 2 , 0, w, h))
      ];

      this.playerSheet["idle2"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w + 9, 0,w,h))
      ];
     this.playerSheet["idle3"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w +15, 0,w,h))
      ];
        this.playerSheet["idle4"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w +23, 0,w,h))
      ];

     }
}


