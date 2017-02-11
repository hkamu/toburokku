//title.js

var audioEngine;

var TitleLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();
        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
          audioEngine.playMusic(res.bgm_mp3, true);
        }

        var TitleBG_png = cc.Sprite.create(res.bg_png);
         TitleBG_png.setPosition(size.width / 2, size.height / 2);
        this.addChild(TitleBG_png);

        var Title_png = cc.Sprite.create(res.title_png);
         Title_png.setPosition(size.width / 2, size.height / 2 + 50);
        this.addChild(Title_png);

        /*var start_png = cc.Sprite.create(res.start_png);
        start_png.setPosition(size.width / 2, size.height / 6);
        this.addChild(start_png);*/
        //add code
         //タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },

    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
      //bgmの再生をとめる
        if (audioEngine.isMusicPlaying()) {
          audioEngine.stopMusic();
        }
        //クリック時のSE再生
        //audioEngine.playEffect("res/se_decide.mp3");
        // 次のシーンに切り替える
        cc.director.runScene(new MyScene());
    },
});

var titleScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new TitleLayer();
        this.addChild(layer);
    }
});
