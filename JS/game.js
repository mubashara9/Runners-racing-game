class Game {
  constructor() {}

  getState() {
    var gameref = database.ref("gamestate");
    gameref.on("value", function (data) {
      gamestate = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gamestate: state,
    });
  }

  async start() {
    if (gamestate === 0) {
      player = new Player();
      var playerCountref = await database.ref("playerCount").once("value");
      if (playerCountref.exists()) {
        playerCount = playerCountref.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }
    player1 = createSprite(200, displayHeight / 2 - 200);
    player2 = createSprite(200, displayHeight / 2 + 200);

    player1.addAnimation("BoyRunning", BoyIMG);
    player2.addAnimation("GirlRunning", GirlIMG);
    players = [player1, player2];
    player2.scale = 0.5;
    player1.scale = 0.5;
    Water = new Group();
    DogCrew = new Group();
    this.addSprites(Water, 20, WaterIMG, 0.5);
    this.addSpritesAn(DogCrew, 2, dogImg, 0.7);//calling add animation function
  }

  addSprites(spriteGroup, NoOfSprites, SpriteImage, Scale) {
    for (var i = 0; i < NoOfSprites; i++) {
      var x, y;
      x = random(width - 400, width * 5 - 200);
      y = random(height / 2 - 300, height / 2 + 300);
      var spirte = createSprite(x, y);
      spirte.addImage(SpriteImage);
      spirte.scale = Scale;
      spriteGroup.add(spirte);
    }
  }
  addSpritesAn(spriteGroup, NoOfSprites, SpriteImage, Scale) { //creating add animation function
    for (var i = 0; i < NoOfSprites; i++) {
      var x, y;
      x = random(width - 400, width * 5 - 200);
      y = random(height / 2 - 300, height / 2 + 300);
      var spirte = createSprite(x, y);
      spirte.addAnimation("run",SpriteImage);
      spirte.scale = Scale;
      spriteGroup.add(spirte);
    }
  }
  handleObsticleCollision(index) {
        if (players[index - 1].collide(Water)) {
            player.positionY += 50
            player.update()
        }

        if (players[index - 1].collide(DogCrew)) {
            player.positionX += -200
            player.update()

        }
    }

  play() {
    Player.getPlayerInfo();
    image(TrackIMG, 0, 0, displayWidth * 5, displayHeight);
    if (allPlayers != undefined) {
      var index = 0;
      var x = 50;
      var y = 50;
      for (var plr in allPlayers) {
        index = index + 1;
        y = allPlayers[plr].positionY;
        x = allPlayers[plr].positionX;
        y = y + 40;
        players[index - 1].x = x;
        players[index - 1].y = y;
        if (index === player.index) {
          camera.position.x = players[index - 1].x + 600;
          camera.position.y = displayHeight / 2;
          players[index - 1].y = y + 400;
          
            this.handleObsticleCollision(index);
        }
      }
    }

    if (keyIsDown(UP_ARROW) && player.positionY > -250) {
      player.positionY += -5;
      player.update();
    }
    if (keyIsDown(RIGHT_ARROW)) {
      player.positionX += 10;
      player.update();
    }

    if (keyIsDown(DOWN_ARROW) && player.positionY < displayHeight - 600) {
      player.positionY += 5;
      player.update();
    }
  
   if (player.positionX > 7180) {
     player.rank += 1;
     Player.updateRank(player.rank);
     gamestate = 2;
     player.update();
   }

    drawSprites();
  }

  end() {
    console.log("Game Ended");
    swal({
      title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
      text: "You reached the finish line successfully",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok",
    });
  }
}

