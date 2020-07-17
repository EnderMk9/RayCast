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