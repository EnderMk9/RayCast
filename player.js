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
        this.rays = [];
        for(let r = 0; r<(dw) ;r++){
            this.scene.tctx.strokeStyle = linc;
            this.scene.tctx.fillStyle = colc;
            let angle = (this.rot+this.fov/2-(this.fov/dw)*r) % (2*Math.PI);
            if (angle < 0){angle = 2*Math.PI + angle;}
            //let angle = this.rot
            this.rays[r] = new ray(this,angle,this.scene);
            this.rays[r].secdis(this.cellxpos,this.cellypos,this.cellxint,this.cellyint);
            this.scene.tctx.strokeStyle = tric;
            this.scene.tctx.beginPath();
            this.scene.tctx.moveTo(this.x, this.y);
            this.scene.tctx.lineTo(this.x+Math.cos(angle)*this.scene.size/2,this.y-Math.sin(angle)*this.scene.size/2);
            this.scene.tctx.closePath();
            this.scene.tctx.stroke();
        }
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