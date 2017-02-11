//resource.js
var res = {
    HelloWorld_png : "res/HelloWorld.png",
    bg_png:"res/bg.png",
    title_png:"res/title.png",
    cloud_png:"res/cloud.png",
    map00_tmx: "res/map00.tmx",
   object_tsx: "res/object.tsx",
   terrain_tsx: "res/terrain.tsx",
   object_png: "res/object.png",
   terrain_png:"res/terrain.png",
   player_1:"res/totem1.png",
   player_2:"res/totem2.png",
   bgm_png:"res/bgm.png",
   bgm_mp3:"res/bgm_battle01_fadeout.mp3",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
