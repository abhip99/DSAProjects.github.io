
function load_img(){
    //player,virus,gem image
    enemy_image = new Image();
    enemy_image.src = "img/v1.png";

    player_img = new Image();
    player_img.src = "img/superhero.png";

    gem_image = new Image();
    gem_image.src = "img/gem.png";
}

function init() {
    //define the objects in the game
    canvas = document.getElementById("mycanvas");
    W = canvas.width = 698;
    H = canvas.height =398;

    pen = canvas.getContext("2d");
    game_over = false;

    e1 = {
        x:150,
        y:50,
        w:60,
        h:60,
        speed: 20,
    };

    e2 = {
        x:300,
        y:150,
        w:60,
        h:60,
        speed: 30,
    };

    e3 = {
        x:450,
        y:20,
        w:60,
        h:60,
        speed: 40,
    };

    enemy = [e1,e2,e3];

    player = {
        x: 20,
        y: H/2,
        w: 60,
        h: 60,
        speed: 20,
        moving: false,
        health: 50,
    };

    gem = {
        x: W-100,
        y: H/2,
        w: 60,
        h: 60,
    };

    canvas.addEventListener('mousedown', function(){
        console.log("Mouse pressed");
        player.moving = true;
    });
    canvas.addEventListener('mouseup', function(){
        console.log("Mouse Released");
        player.moving = false;
    });
    
}

function isOverlap(rect1, rect2){
    if(rect1.x < rect2.x + rect2.w && 
        rect1.x + rect1.w > rect2.x && 
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y){
            return true;
        }

    return false;
}

function draw(){
    //clear old frame
    pen.clearRect(0,0,W,H);
    // pen.fillStyle ="red";

    //player Image
    pen.drawImage(player_img, player.x, player.y, player.w, player.h);

    //gem drawImage
    pen.drawImage(gem_image, gem.x, gem.y, gem.w, gem.h);


    for(let i =0;i<enemy.length;i++){
        pen.drawImage(enemy_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }

    pen.fillStyle ="white";
    pen.fillText("Score "+ player.health, 10,10);
}

function update(){
    
    if(player.moving == true){
        player.x+= player.speed;
        player.health += 50;
    }

    //overlap b/w enemy and player  
    for(let i=0;i<enemy.length;i++){
        if(isOverlap(enemy[i],player)){
            player.health -= 100;
            if(player.health<0){
                console.log(player.health);
                game_over = true;
                alert("Game Over" + player.health);
            }
        }
    }

    // overlap b/w player and gem  
    if(isOverlap(player, gem) == true){
        console.log("You Won!");
        alert("You won!");
        game_over = true;
        return;
    }

    //move the box downward
    for(let i=0;i<enemy.length;i++){
        enemy[i].y += enemy[i].speed;
        if(enemy[i].y>= H- enemy[i].h || enemy[i].y < 0){
            enemy[i].speed *= -1;
        }
    }

    // box.y+= box.speed;
    // if(box.y>= H - box.h || box.y< 0){
    //     box.speed*= -1;
    // }
}

function gameloop(){
    if(game_over == true){
        clearInterval(f);
    }
    draw();
    update();

}

load_img();
init();
var f = setInterval(gameloop, 100);