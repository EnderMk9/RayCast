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
                else if(this.map[y][x]==2)
                    this.color = tric;
                this.tctx.fillStyle = this.color;
                this.tctx.strokeStyle = tric;
                this.tctx.fillRect(x*this.size+this.coord[0],y*this.size+this.coord[1],this.size,this.size);
                this.tctx.strokeRect(x*this.size+this.coord[0],y*this.size+this.coord[1],this.size,this.size);
            }
        }
    }
}