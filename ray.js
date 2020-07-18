class ray {
    constructor(player, angle,scene){
        this.player = player;
        this.x0 = this.player.x;
        this.y0 = this.player.y;
        this.angle = angle;
        this.scene = scene;
        this.map = this.scene.map;
        //console.log(this.map);
    }
    secdis (cellxpos,cellypos,cellxint,cellyint){
        this.cos1  = (Math.cos(this.angle)/Math.abs(Math.cos(this.angle)))
        this.sin1  = (Math.sin(this.angle)/Math.abs(Math.sin(this.angle)))
        let tan1  = (Math.tan(this.angle)/Math.abs(Math.tan(this.angle)))
        this.acos1 = (Math.acos(-this.cos1)/Math.PI-this.cos1*cellxpos)
        let acos2 = (Math.acos(this.sin1)/Math.PI+this.sin1*cellypos)
        let tan2  = tan1*this.angle+Math.acos(this.cos1)
        let ysec  = this.scene.size*this.acos1*Math.tan(tan2);
        let xsec  = this.scene.size*acos2/Math.tan(tan2);
        let size  = 4;
        this.xsecx = Math.round(this.cos1*xsec);
        this.xsecy = Math.round(-this.sin1*acos2*this.scene.size);
        this.ysecx = Math.round(+this.cos1*this.acos1*this.scene.size);
        this.ysecy = Math.round(-this.sin1*ysec);   
        this.hcheck();
        this.vcheck();
        this.ydis  = Math.sqrt(this.ysecx*this.ysecx+this.ysecy*this.ysecy);
        this.xdis  = Math.sqrt(this.xsecx*this.xsecx+this.xsecy*this.xsecy);
        //console.log([this.xsecy,this.ysecx]);
        //console.log([this.xdis,this.ydis]);
        this.scene.tctx.stroke();
        this.scene.tctx.beginPath();
        this.scene.tctx.moveTo(this.x0, this.y0);
        //levelreset(this.scene);
        if (this.xdis < this.ydis){
            this.scene.tctx.lineTo(this.x0+this.xsecx,this.y0+this.xsecy);
            this.scene.tctx.fillRect(this.x0+this.xsecx-size/2,this.y0+this.xsecy-size/2, size, size);
            this.dist = Math.abs(this.xdis*Math.cos(this.angle-this.player.rot));
        }else{
            this.scene.tctx.lineTo(this.x0+this.ysecx,this.y0+this.ysecy);
            this.scene.tctx.fillRect(this.x0+this.ysecx-size/2,this.y0+this.ysecy-size/2, size, size);
            this.dist = Math.abs(this.ydis*Math.cos(this.angle-this.player.rot));}
        this.scene.tctx.closePath();
        this.scene.tctx.stroke();
    }
    hcheck(){
    	if (this.angle > 0 && this.angle < Math.PI){
            let y = this.xsecy;
            let x = this.xsecx;
            let nextcellval = this.map[this.cell(this.x0+x,this.y0+y)[1]][this.cell(this.x0+x,this.y0+y)[0]];
    		while (nextcellval == 0){
    			y -= this.scene.size;
    			x += (this.xsecx/-this.xsecy)*this.scene.size;
                nextcellval = this.map[this.cell(this.x0+x,this.y0+y-5)[1]][this.cell(this.x0+x,this.y0+y)[0]];
    		};
            this.xsecx = x;
            this.xsecy = y;
    	} else if (this.angle < 2*Math.PI && this.angle > Math.PI){
            let y = this.xsecy;
            let x = this.xsecx;
            let nextcellval = this.map[this.cell(this.x0+x,this.y0+y)[1]][this.cell(this.x0+x,this.y0+y)[0]];
            while (nextcellval == 0){
                y += this.scene.size;
                x += (this.xsecx/this.xsecy)*this.scene.size;
                nextcellval = this.map[this.cell(this.x0+x,this.y0+y)[1]][this.cell(this.x0+x,this.y0+y)[0]];
            };
            this.xsecx = x;
            this.xsecy = y;
    	};
    }
    vcheck(){
        if (this.angle > (3/2)*Math.PI || this.angle < Math.PI/2){
            let y = this.ysecy;
            let x = this.ysecx;
            let outof =(((this.cell(this.x0+x,this.y0+y)[1] > 0) && (this.cell(this.x0+x,this.y0+y)[0] > 0)) && ((this.cell(this.x0+x,this.y0+y)[1] < this.scene.mapw+1) && (this.cell(this.x0+x,this.y0+y)[0] < this.scene.maph+1)));
            if (outof){
                let nextcellval = this.map[this.cell(this.x0+x,this.y0+y)[1]][this.cell(this.x0+x,this.y0+y)[0]];
                while (nextcellval == 0){
                    x += this.scene.size;
                    y += (this.ysecy/this.ysecx)*this.scene.size;
                    outof = (((this.cell(this.x0+x,this.y0+y)[1] > 0) && (this.cell(this.x0+x,this.y0+y)[0] > 0)) && ((this.cell(this.x0+x,this.y0+y)[1] < this.scene.mapw+1) && (this.cell(this.x0+x,this.y0+y)[0] < this.scene.maph+1)));
                    if (outof)
                        nextcellval = this.map[this.cell(this.x0+x,this.y0+y)[1]][this.cell(this.x0+x,this.y0+y)[0]];
                    else {break;}
            };};
            this.ysecx = x;
            this.ysecy = y;
        } else if (this.angle < (3/2)*Math.PI && this.angle > Math.PI/2){
            let y = this.ysecy;
            let x = this.ysecx;
            let outof =(((this.cell(this.x0+x,this.y0+y)[1] > 0) && (this.cell(this.x0+x,this.y0+y)[0] > 0)) && ((this.cell(this.x0+x,this.y0+y)[1] < this.scene.mapw+1) && (this.cell(this.x0+x,this.y0+y)[0] < this.scene.maph+1)));
            if (outof){
                let nextcellval = this.map[this.cell(this.x0+x,this.y0+y)[1]][this.cell(this.x0+x,this.y0+y)[0]];
                while (nextcellval == 0){
                    x -= this.scene.size;
                    y -= (this.ysecy/this.ysecx)*this.scene.size;
                    outof = (((this.cell(this.x0+x,this.y0+y)[1] > 0) && (this.cell(this.x0+x,this.y0+y)[0] > 0)) && ((this.cell(this.x0+x,this.y0+y)[1] < this.scene.mapw+1) && (this.cell(this.x0+x,this.y0+y)[0] < this.scene.maph+1)));
                    if (outof)
                        nextcellval = this.map[this.cell(this.x0+x,this.y0+y)[1]][this.cell(this.x0+x,this.y0+y)[0]];
                    else {break;}
            };};
            this.ysecx = x;
            this.ysecy = y;
        };
    }
    cell(x,y){
        this.cellx = (x-(this.scene.size)/2)/this.scene.size;
        this.celly = (y-(this.scene.size)/2)/this.scene.size;
        return [Math.floor(this.cellx),Math.floor(this.celly)];
    }
}