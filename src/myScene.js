//myScene.js

var startTouch;
var endTouch;
var direct;//形作るためのなにか
var Layer;
var position;//ポジション
var player;
var playerBody;
var playershape;
var px;
var py;
var space;
var shapeArray=[];
var objectArray=[];
var anime;
var bgm_png;
var bgm_box;
var bgm_flg;

if (typeof SpriteTag == "undefined") {
   var SpriteTag = {};
   SpriteTag.terrain = 1;

   SpriteTag.bomb = 2;
   SpriteTag.koban = 4;
   SpriteTag.food = 8;
   SpriteTag.monster1 = 16;
   SpriteTag.monster2 = 32;

   SpriteTag.player = 128;

};

var MyLayer = cc.Layer.extend({
  node: null,
  space:null,
  ctor: function() {
    this._super();
    var size = cc.director.getWinSize();

    if (!audioEngine.isMusicPlaying()) {
      audioEngine.playMusic(res.bgm_mp3, true);
    }

    bgm_flg = true;

    anime = 0;

    //var tiledmap = new Tiledmap(this);

    space = new cp.Space();

    var debugDraw = cc.PhysicsDebugNode.create(space);
      debugDraw.setVisible(true);
      this.addChild(debugDraw, 100);
    // Gravity
    space.gravity = cp.v(0, -350);
    // set up Walls
    var wallBottom = new cp.SegmentShape(space.staticBody,
        cp.v(0, 50),// start point
        cp.v(4294967295, 50),// MAX INT:4294967295
        0);// thickness of wall
    space.addStaticShape(wallBottom);

    var bg_png = cc.Sprite.create(res.bg_png);
    bg_png.setPosition(size.width / 2, size.height / 2);
    this.addChild(bg_png);

    bgm_png = cc.Sprite.create(res.bgm_png);
    bgm_png.setPosition(size.width / 1.1, size.height / 1.08);
    this.addChild(bgm_png);

    var tiledmap = new Tiledmap(this);

    //小惑星の生成で追加
    this.schedule(this.addAsteroid, 0.5);

    cc.eventManager.addListener(listener, this);

    player = new cc.Sprite.create(res.player_1);
    this.addChild(player);
    player.setPosition(100,200);

    playerBody = new cp.Body(1,cp.momentForBox(1,24,24));
    playerBody.setPos(cp.v(100,200));
    space.addBody(playerBody);

    playershape = new cp.BoxShape(playerBody,24,24);
    playershape.setFriction(1);
    playershape.setElasticity(1);
    playershape.image = player;
    space.addShape(playershape);

    this.scheduleUpdate();
    return true;
  },
  //小惑星の生成で追加
  addAsteroid: function(event) {
    var asteroid = new Asteroid();
    this.addChild(asteroid);
  },
  removeAsteroid: function(asteroid) {
    this.removeChild(asteroid);
  },

  update: function(dt) {
      space.step(dt);
         playershape.image.x = playershape.body.p.x;
         playershape.image.y = playershape.body.p.y;
         var angle =  Math.atan2(-playershape.body.rot.y,playershape.body.rot.x);
         playershape.image.rotation = angle*57.295775;

         anime++;
         console.log(anime);
         if(anime == 200) player.setTexture(res.player_2);
         if(anime == 230) player.setTexture(res.player_1);
         if(anime == 260) player.setTexture(res.player_2);
         if(anime == 290) {
           player.setTexture(res.player_1);

         anime = 0;
       }
  }
});

//たっちいべんとりすなー
var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    //タッチ開始時の処理
    onTouchBegan:function (touch,event) {
      startTouch = touch.getLocation();
      yazirusi();
      bgm_box = bgm_png.getBoundingBox();
      if(cc.rectContainsPoint(bgm_box,touch.getLocation())){
        if(bgm_flg == true){
          bgm_png.setOpacity(120);
          audioEngine.stopMusic();
          bgm_flg = false;
        }else if (bgm_flg == false){
          bgm_png.setOpacity(255);
          audioEngine.playMusic(res.bgm_mp3,true);
          bgm_flg = true;
        }
      }
      return true;
    },
    //タッチ移動時の処理
    onTouchMoved:function(touch, event){
      cc.log("Touch Moved!");
      endTouch = touch.getLocation();
      //position = touch.getLocation();
      direct.clear();
      yazirusi();
      katati(); //角度計算と矢印の長さを設定
    },
    //タッチ終了時の処理
    onTouchEnded:function(touch, event){
      endTouch = touch.getLocation();
      direct.clear();
      playerBody.applyImpulse(cp.v(-px*2,-py*2),cp.v(0,0));
      px = 0;
      py = 0;
      //katati();//角度計算と矢印の長さを設定
    },
});

//小惑星クラス
var Asteroid = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.cloud_png);
  },
  onEnter: function() {
    this._super();
    this.setPosition(400, Math.random() * 400);
    var moveAction = cc.MoveTo.create(2.5, new cc.Point(-100, Math.random() * 350));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
});

function yazirusi(){

  console.log(startTouch);
  direct = new cc.DrawNode();
  layer.addChild(direct);
      //形作る
      direct.drawPoly([cc.p(0,0),
                      cc.p(-70,-80),cc.p(-30,-80),
                      cc.p(0,-150),
                      cc.p(30,-80),cc.p(70,-80)],/*形*/
                      cc.color(255, 0, 0, 255),/*中塗りつぶし*/
                      5/*線幅*/,
                      cc.color(255, 128, 128, 255));/*線の色*/
      direct.setPosition(startTouch);
};

function katati(){

  //スワイプ方向を検出する処理
    var distX = endTouch.x - startTouch.x ;
    var distY = endTouch.y - startTouch.y ;
    var distZ = Math.sqrt(distX * distX  + distY * distY);
    if(distZ > 140){
    direct.drawPoly([cc.p(0,0),
                    cc.p(-70,-80),cc.p(-30,-80),
                    cc.p(0,-distZ),
                    cc.p(30,-80),cc.p(70,-80)],/*形*/
                    cc.color(255, 0, 0, 255),/*中塗りつぶし*/
                    5/*線幅*/,
                    cc.color(255, 128, 128, 255));/*線の色*/
                  }

//角度（ラジアン）を求める
  var angle= Math.atan2(distY , distX )
//角度（ラジアン）を角度（度数）に変換
  angle = angle * 180 / Math.PI;
//矢印を回転させる
  direct.setRotation(270-angle);
  px = distX;
  py = distY;
};

var MyScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        layer = new MyLayer();
        this.addChild(layer);
    }
});
