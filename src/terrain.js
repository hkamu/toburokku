//プレイヤークラス
var Terrain = cc.Class.extend({ // cc.Classを継承
   sprite: null, // スプライトを保持
   spriteSheet: null,
   body: null, // bodyを保持
   shape: null, // Shapeを保持

   ctor: function(parent, posX, posY, tag) { // コンストラクタ


     this.spriteSheet = new cc.SpriteBatchNode(res.terrain_png);
     for (var i = 0; i < 4; i++) {
        var spriteFrame = new cc.SpriteFrame(res.terrain_png, cc.rect(24 * i, 0, 24, 24));
          var str = "terrain" + i;
        cc.spriteFrameCache.addSpriteFrame(spriteFrame,  str);
      //  var frame = cc.spriteFrameCache.getSpriteFrame(str);
        //animFrames.push(frame);
      }
      // var animation = new cc.Animation(animFrames, 0.1);
      // this.runningAction = new cc.RepeatForever(new cc.Animate(animation));

      this.sprite = cc.Sprite.create('#terrain0');
    //  this.sprite.runAction(this.runningAction);
      var size =   this.sprite.getContentSize(); // スプライトのサイズを取得
    var body = new cp.Body(Infinity, Infinity);
    //var body = new cp.StaticBody();
      body.setPos(cp.v(posX, posY));
      parent.addChild(  this.sprite, 0);
      this.sprite.setPosition(posX, posY);

     //space.addBody(body);
      var shape = new cp.BoxShape(body, size.width, size.height);
      shape.setFriction(0);
      shape.setElasticity(0);
      shape.tag = tag;
      shape.setCollisionType(shape.tag);
      shape.image =   this.sprite;
      //space.addShape(shape);
          space.addStaticShape(shape);

      shapeArray.push(shape);

   },


   update: function(dt) {

   },

});
