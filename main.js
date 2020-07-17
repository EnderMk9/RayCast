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

var level = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,1,0,0,0,1],
    [1,0,0,0,1,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1],
];

document.addEventListener("keydown",function(key){
    //console.log(key.keycode);
    switch(key.keyCode){
        case 87: player.mvfwd();
        break;
        case 83: player.mvbck();
        break;
        case 65: player.rtleft();
        break;
        case 68: player.rtright();
        break;
    };
});

class scene {
    constructor(topview, tctx, map, size, coord) {
        this.canvas = topview;
        this.tctx = tctx;
        this.map = map;
        this.size = size;
        this.coord = coord;
        this.maph = map.length;
        this.mapw = map[0].length;
    }
    draw() {
        for(let y=0; y<this.maph; y++){
            for(let x=0; x<this.mapw; x++){
                if(this.map[y][x]==1)
                    this.color = wallc;
                else if(this.map[y][x]==0)
                    this.color = backg;
                this.tctx.fillStyle = this.color;
                this.tctx.fillRect(x*this.size+1+this.coord[0],y*this.size+1+this.coord[1],this.size-2,this.size-2);
            }
        }
    }
}

class ray {
    constructor(player, angle){
        this.player = player;
        this.x0 = this.player.x;
        this.y0 = this.player.y;
        this.angle = angle;
    }
}

class player{
    constructor(scene,fov,v,w,pcoord,psize){
        this.scene = scene;
        this.fov = fov;
        this.v = v;
        this.w = w;
        this.adv = 0;
        this.rot = 0;
        this.xd = 0;
        this.yd = 0;
        this.psize = psize;
        this.pcoord = pcoord;
        this.x0 = this.scene.coord[0]+(this.pcoord[0]+1)*(this.scene.size)-(this.scene.size)/2-this.psize/2;
        this.y0 = this.scene.coord[1]+(this.pcoord[1]+1)*(this.scene.size)-(this.scene.size)/2-this.psize/2;
        this.x0c = this.x0+this.psize/2;
        this.y0c = this.x0+this.psize/2;
        this.x = this.x0c;
        this.y = this.y0c;
    }
    update(){
        this.txd = this.xd + this.adv*Math.cos(this.rot);
        this.tyd = this.yd - this.adv*Math.sin(this.rot);
        this.tx = this.x0c + this.txd;
        this.ty = this.y0c + this.tyd;
        this.cell(this.tx,this.ty);
        if (this.scene.map[this.cellyint][this.cellxint] != 1){
            this.xd = this.txd; this.yd = this.tyd; this.x = this.tx; this.y = this.ty;
        };
        this.cell(this.x,this.y);
        this.adv = 0;
    }
    cell(x,y){
        this.cellx = (x-(this.scene.size)/2)/this.scene.size;
        this.celly = (y-(this.scene.size)/2)/this.scene.size;
        this.cellxint = Math.floor(this.cellx); this.cellyint = Math.floor(this.celly);
        this.cellxpos = this.cellx - this.cellxint; this.cellypos = this.celly - this.cellyint;
    }
    drawtri(){
        this.scene.tctx.strokeStyle = tric;
        this.scene.tctx.beginPath();
        this.scene.tctx.moveTo(this.x0c+this.xd, this.y0c+this.yd);
        this.scene.tctx.lineTo(this.x0c+this.xd+ this.scene.size*Math.cos(this.rot), this.y0c+this.yd);
        this.scene.tctx.lineTo(this.x0c+this.xd, this.y0c+this.yd+this.scene.size*Math.sin(this.rot));
        this.scene.tctx.closePath();
        this.scene.tctx.stroke();
    }
    drawrays(){
        this.scene.tctx.strokeStyle = linc;
        this.scene.tctx.fillStyle = colc;
        for(let r = 0; r<(dw) ;r++){
            let angle = this.rot-this.fov/2+(r/dw);
            //if (r % (dw/20) == 0){
                //let angle = this.rot
                let cos1  = (Math.cos(angle)/Math.abs(Math.cos(angle)))
                let sin1  = (Math.sin(angle)/Math.abs(Math.sin(angle)))
                let tan1  = (Math.tan(angle)/Math.abs(Math.tan(angle)))
                let acos1 = (Math.acos(-cos1)/Math.PI-cos1*this.cellxpos)
                let acos2 = (Math.acos(sin1)/Math.PI+sin1*this.cellypos)
                let tan2  = tan1*angle+Math.acos(cos1)
                let ox    = this.x; let oy = this.y;
                let ysec  = this.scene.size*acos1*Math.tan(tan2);
                let xsec  = this.scene.size*acos2/Math.tan(tan2);
                let size  = 4
                let xsecx = +cos1*xsec-size/2
                let xsecy = -sin1*acos2*this.scene.size-size/2
                let xdis  = Math.sqrt(xsecx*xsecx+xsecy*xsecy);
                let ysecx = +cos1*acos1*this.scene.size-size/2
                let ysecy = -sin1*ysec-size/2
                let ydis  = Math.sqrt(ysecx*ysecx+ysecy*ysecy);
                this.scene.tctx.stroke();
                this.scene.tctx.beginPath();
                this.scene.tctx.moveTo(ox, oy);
                if (xdis > ydis){
                    this.scene.tctx.lineTo(ox+xsecx,oy+xsecy);
                    this.scene.tctx.fillRect(ox+xsecx,oy+xsecy, size, size);
                    this.scene.tctx.fillRect(ox+ysecx,oy+ysecy, size, size);
                }else{
                    this.scene.tctx.lineTo(ox+ysecx,oy+ysecy);
                    this.scene.tctx.fillRect(ox+ysecx,oy+ysecy, size, size);
                    this.scene.tctx.fillRect(ox+xsecx,oy+xsecy, size, size);}
                this.scene.tctx.closePath();
                this.scene.tctx.stroke();

            };//};
    }
    draw(){
        this.scene.tctx.fillStyle = playc;
        this.scene.tctx.fillRect(this.x0+this.xd,this.y0+this.yd,this.psize,this.psize);
        //this.drawtri();
        this.drawrays();
    }
    mvfwd  (){this.adv =  this.v; this.update();}
    mvbck  (){this.adv = -this.v; this.update();}
    rtright(){
        this.rot -= this.w;
        this.rot  = this.rot % (2*Math.PI);
        if (this.rot < 0){this.rot = 2*Math.PI + this.rot;};
    }
    rtleft (){
        this.rot += this.w;
        this.rot  = this.rot % (2*Math.PI);
    }
}

function init() {
    topview = document.getElementById("topview");
    display = document.getElementById("display");
    tctx = topview.getContext("2d");
    dctx = display.getContext("2d");
    scene1 = new scene(topview, tctx, level, cellsize, [25,25]);
    topview.width  = cellsize*scene1.mapw + cellsize;
    topview.height = cellsize*scene1.maph + cellsize;
    display.width  = dw;
    display.height = dh;
    player = new player(scene1, Math.PI/2,5,Math.PI/50,[2,2],5);
    player.update();
    setInterval(function(){main();},1000/FPS);
};

function clear() {
    topview.width = topview.width;
    topview.height = topview.height;
};

function main() {
    clear();
    scene1.draw();
    player.draw();
};