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