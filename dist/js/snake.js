var canvas;
var context;
var interval;
document.getElementById('button').addEventListener('click',function(){
    button = document.getElementById('button'); 
    button.classList.remove('active'); 
    
    canvas = document.getElementById('canvas');
    canvas.classList.add('active');
    context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    
    //call a game function 15 times every second
    interval = setInterval(game, 1000/15); 
});
let playerX = playerY = 10; 
let gridSize = tileCount = 20; 
let appleX = appleY = 15;
let velocityX = velocityY = 0; 
let trail = [];
let tail = 5;
let game = function(){
    playerX += velocityX; 
    playerY += velocityY; 
    if(playerX<0){
        playerX = tileCount-1; 
    }
    if(playerX>tileCount-1){
        playerX = 0; 
    }
    if(playerY<0){
        playerY = tileCount-1; 
    }
    if(playerY>tileCount-1){
        playerY = 0; 
    }
    context.fillStyle="black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle="green";
    for(let i=0; i<trail.length; i++){
        context.fillRect(trail[i].x*gridSize, trail[i].y*gridSize, gridSize-2, gridSize-2); 
        if(trail[i].x == playerX && trail[i].y == playerY){
            if(tail>5){
                alert('Game over')
                playerX = playerY = 10; 
                velocityX = velocityY = 0; 
                clearInterval(interval);
                canvas.classList.remove('active');
                button.classList.add('active');
            }
            tail = 5;
            
        }
    }
    trail.push({
        x: playerX, 
        y: playerY
    });
    while(trail.length>tail){
        trail.shift(); 
    }
    if(appleX == playerX && appleY == playerY){
        tail++;
        appleX = Math.floor(Math.random()*tileCount); 
        appleY= Math.floor(Math.random()*tileCount); 
    }
    context.fillStyle="red";
    context.fillRect(appleX*gridSize, appleY*gridSize, gridSize-2, gridSize-2);
}
let keyPush = function(e){

    e.preventDefault(); 

    switch(e.keyCode){
        case 37:
            velocityX = -1; 
            velocityY = 0; 
            break;
        case 38:
            velocityX = 0; 
            velocityY = -1; 
            break;
        case 39:
            velocityX = 1; 
            velocityY = 0; 
            break;
        case 40: 
            velocityX = 0; 
            velocityY = 1; 
            break;
    }
}