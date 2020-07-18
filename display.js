class screen {
	constructor(display,dctx,player){
		this.display = display;
		this.dctx = dctx;
		this.player = player;
	}

	draw (){
		let rays = this.player.rays;
		console.log(rays.length);
		this.dctx.strokeStyle = wallc;
		for(let r = 0; r<(dw) ;r++){
   			this.dctx.beginPath();
	        this.dctx.moveTo(r,dh/2-dw*cellsize/(5*rays[r].dist));
	        this.dctx.lineTo(r,dh/2+dw*cellsize/(5*rays[r].dist));
	        this.dctx.closePath();
	        this.dctx.stroke();
		};
	}
}