var player1, player2
var edges
var powerUp1, powerUp2, powerUp3, speed, size, coin, bgi, alien1, alien2
var powerUp1Group, powerUp2Group, powerUp3Group
var player1sizeW = 0
var player1speedH = 0
var player1p3 = 0
var player2sizeW = 0
var player2speedH = 0
var player2p3 = 0
var gameState = "play"
var winner

function preload(){
    speed = loadImage("diamond.png")
    size = loadImage("bronze.png")
    coin = loadImage("goldbar.png")
    bgi = loadImage("gradient_22.png")
    alien1 = loadImage("retroaliens_05.png")
    alien2 = loadImage("retroaliens_09.png")

}

function setup(){
    createCanvas(1525,750)
    player1 = createSprite(random(100,width-80),random(150,height-80),50,50)
    player1.shapeColor = "gold"
    player1.addImage(alien1)
    player1.scale = 0.20
    // player1.velocityX = random(-5,5)
    // player1.velocityY = random(-5,5)
   
    player2 = createSprite(random(100,width-10),random(150,height-10),50,50)
    player2.shapeColor = "blue"
    player2.addImage(alien2)
    player2.scale = 0.20
    player2.velocityX = random(-5,5)
    player2.velocityY = random(-5,5)

    powerUp1Group = createGroup()
    powerUp2Group = createGroup()
    powerUp3Group = createGroup()

    edges = createEdgeSprites()

    
}   

function draw(){
    background(bgi)

    if(gameState === "play"){

        if(keyDown(UP_ARROW)){
            player1.y -= 4
            //player2.y += 4
        }
    
        if(keyDown(DOWN_ARROW)){
            player1.y += 4
            //player2.y -= 4
        }
        
        if(keyDown(RIGHT_ARROW)){
            player1.x += 4
            //player2.x -= 4
        }
    
        if(keyDown(LEFT_ARROW)){
            player1.x -= 4
            //player2.x += 4
        }
        if(player1sizeW >= 10 &&player1speedH >= 10 &&player1p3 >= 3){
            gameState = "end"
            winner = "player1"
              
              
          }
      
          if(player2sizeW >= 10 &&player2speedH >= 10 &&player2p3 >= 3|| player2.isTouching(player1)){
              gameState = "end"
              winner = "player2"
      
              
          }

          

        spawnPowerUp1()
    spawnPowerUp2()
    spawnPowerUp3()

    if(powerUp1Group.isTouching(player2)){
        player2.width += 5
        powerUp1.destroy()
        player2sizeW += 5
    }

    if(powerUp1Group.isTouching(player1)){
        player1.width += 5
        powerUp1.destroy()
        player1sizeW += 5
    }

    if(powerUp2Group.isTouching(player2)){
        player2.height += 5
        powerUp2.destroy()
        player2speedH += 5
    }
    

    if(powerUp2Group.isTouching(player1)){
        player1.height += 5
        powerUp2.destroy()
        player1speedH += 5
    }

    if(powerUp3Group.isTouching(player1)){
        powerUp3.destroy()
        //player2.velocityX = 0
        //player2.velocityY = 0
        player1p3 += 1
        
    }

    if(powerUp3Group.isTouching(player2)){
        powerUp3.destroy()
        //player1.velocityX = 0
        //player1.velocityY = 0
        player2p3 += 1
    }

    if(player2.isTouching(player1)){
        player1.destroy()
        player2.velocityX = 0
        player2.velocityY = 0
    }
    }
    
    else if(gameState === "end"){
        if(winner === "player1"){
            push()
            fill("gold")
            stroke("blue")
            strokeWeight(7)
            textSize(60)
              text("Player 1 has won. Well done",width/2-400,height/2)
              pop()
        }
        else{
            winner = "player2"
            push()
            fill("gold")
            stroke("blue")
            strokeWeight(7)
            textSize(60)
              text("Player 2 has won. Well done!",width/2-400,height/2)
              pop()
        }
        player2.velocityX = 0
        player2.velocityY = 0
        powerUp1Group.destroyEach()
        powerUp2Group.destroyEach()
        powerUp3Group.destroyEach()
    }

    player1.bounceOff(edges)
    player2.bounceOff(edges)
    fill("gold")
    textSize(20)
    text("Player1 Size: "+player1sizeW,width-200,50)
    text("Player1 Speed: "+player1speedH,width-200,80)
    text("Player1 P3: "+player1p3,width-200,110)

    fill("gold")
    textSize(20)
    text("Player2 Size: "+player2sizeW,30,50)
    text("Player2 Speed: "+player2speedH,30,80)
    text("Player2 P3: "+player2p3,30,110)
    drawSprites()


    
    }

function spawnPowerUp1(){
    if(frameCount %200===0){
        powerUp1 = createSprite(random(100,width-80),random(150,height-80),50,50)
        powerUp1.addImage(speed)
        powerUp1.scale = 0.15
        powerUp1.lifetime = 170
        powerUp1Group.add(powerUp1)
    }
}

function spawnPowerUp2(){
    if(frameCount %200===0){
        powerUp2 = createSprite(random(100,width-80),random(150,height-80),50,50)
        powerUp2.addImage(size)
        powerUp2.scale = 0.25
        powerUp2.lifetime = 170
        powerUp2Group.add(powerUp2)
    }
}

function spawnPowerUp3(){
    if(frameCount %150===0){
        powerUp3 = createSprite(random(100,width-80),random(150,height-80),50,50)
        powerUp3.addImage(coin)
        powerUp3.scale = 0.25
        powerUp3.lifetime = 200
        powerUp3Group.add(powerUp3)
    }
}