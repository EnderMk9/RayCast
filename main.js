var FPS = 60;
var cellsize = 50;
var dw = 978;
var dh = 550;
const backg = "#999999";
const wallc = "#000000";
const playc = "#F0F0F0";
const tric  = "#FF0000";
const linc  = "#0000FF";
const colc  = "#00FF00";
const PI = 3.14159265359

function init() {
    topview = document.getElementById("topview");
    display = document.getElementById("display");
    tctx = topview.getContext("2d");
    dctx = display.getContext("2d");
    scene1   = new scene(topview, tctx, level, cellsize, [cellsize/2,cellsize/2]);
    topview.width  = cellsize*scene1.mapw + cellsize;
    topview.height = cellsize*scene1.maph + cellsize;
    display.width  = dw;
    display.height = dh;
    player   = new player(scene1, Math.PI/2,5,Math.PI/100,[2,2],5);
    display1 = new screen(display, dctx, player);
    player.update();
    setInterval(function(){main();},1000/FPS);
};

function clear(canvas) {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
};

function main() {
    clear(topview); clear(display);
    scene1.draw();
    player.draw();
    display1.draw();
};

function download1(){
    document.getElementById("downloader1").download = "image1.png";
    document.getElementById("downloader1").href = document.getElementById("topview").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}

function download2(){
    document.getElementById("downloader2").download = "image2.png";
    document.getElementById("downloader2").href = document.getElementById("display").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}