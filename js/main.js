class Game {
  constructor() {
    this.player = null; // null = pointing nowhere for now
    this.obstacles = []; // will hold instancen sof the class obstacles
  }

  start() {
    this.player = new Player(); // you can also do it in the class Game
    this.attachEventListeners();

    // Create obstacles
    setInterval(() => {
      const newObstacle = new Obstacle();
      this.obstacles.push(newObstacle);
    }, 2750);

    // let time = 0;

    // updating obstacles: Move obstacles & detect collision
    setInterval(() => {
      // time++;
      // // Create obstacles
      // // time will be increased by one and if it hits 10 a new obstacle will
      // if (time % 10 === 0) {
      //   const obstacleInstance = new Obstacle();
      //   obstacles.push(obstacleInstance);
      // }

      this.obstacles.forEach((obstacleInstance) => {
        //move current obstacle
        obstacleInstance.moveDown();

        // detect collisison with curernt obstacle
        this.detectCollision(obstacleInstance);

        // check if we need to remove the obstacle
        this.removeObstacleIfOutside(obstacleInstance);
      });
    }, 50);

    setInterval; // chronometer
  }

  attachEventListeners() {
    // "keydown" means pressing any key
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.player.moveLeft();
      } else if (event.key === "ArrowRight") {
        this.player.moveRight();
      }
    });
  }

  detectCollision(obstacleInstance) {
    //detect if there's a collision between player and current obstacle
    const isCollision =
      this.player.positionX <
        obstacleInstance.positionX + obstacleInstance.width &&
      this.player.positionX + this.player.width > obstacleInstance.positionX &&
      this.player.positionY <
        obstacleInstance.positionY + obstacleInstance.height &&
      this.player.height + this.player.positionY > obstacleInstance.positionY;

    if (isCollision) {
      console.log("collision detected!!");
      //location.href ="https://media.tenor.com/Lhlq72-SMvYAAAAC/lost-the.gif";
    }
  }

  removeObstacleIfOutside(obstacleInstance) {
    // ckecking if obstacle has moved out of screen
    if (obstacleInstance.positionY <= 0 - obstacleInstance.height) {
      console.log(
        "remove obstacle with position ...",
        obstacleInstance.positionY
      );

      obstacleInstance.domElement.remove();
      this.obstacles.shift();
      // console.log(obstacles);
    }
  }
  // pause() {
  //   // pausing the chronometer
  // }
}

class Player {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.positionX = 50 - this.width / 2; // 50% = middle of the screen
    this.positionY = 1;

    this.domElement = null; // null = pointing to "nowhere", will be aded a value later
    // when we need a variable that needs to be accessed from multiple places, we store it
    // as a property

    this.createDomElement();
  }

  createDomElement() {
    // everytime we create a new player, we will be creaeting an
    // element in the DOM

    // step1: create the element:
    this.domElement = document.createElement("div");
    // we just call it sth and create an element in the whole HTML
    // document, which is going to be div

    // step2: add content or modify (ex. innerHTML...)
    this.domElement.id = "player";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";
    // we think in a diagram-way, so x=0, y=0 means in the bottom left corner
    // x=100, y=100 means in the top right corner
    // domElement.setAttribute("src", "./mouth.png")

    //step3: append to the dom: `parentElm.appendChild()`
    const boardElm = document.getElementById("board");
    // get a reference to the element "board" in the HTML file
    boardElm.appendChild(this.domElement);
    // once you have the reference, attach it to the parent element
    // in the HTML file
  }

  moveLeft() {
    if (this.positionX > 0) {
      this.positionX -= 1;
      // this line above is only to check the code in the console
      this.domElement.style.left = this.positionX + "vw";
    }
  }

  moveRight() {
    if (this.positionX < 100) {
      this.positionX += 1;
      // this line above is only to check the code in the console
      this.domElement.style.left = this.positionX + "vw";
      //updating the position in CSS???
    }
  }
}

class Obstacle {
  constructor() {
    this.width = 20;
    this.height = 10;
    this.positionX = 50 - this.width / 2;
    // TODO random start between 0 - 100-20
    this.positionY = 90;

    this.domElement = null;
    this.createDomElement();
  }

  createDomElement() {
    // step1: create the element:
    this.domElement = document.createElement("div");

    // step2: add content or modify (ex. innerHTML...)
    this.domElement.className = "obstacle";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    //step3: append to the dom: `parentElm.appendChild()`
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }

  moveDown() {
    // logic:
    //first, we have info stored in the code (class, constructor)
    // second, we modify the info of the class (here in the method)

    this.positionY -= 1;
    // third, we update the info in CSS (DOM), i.e. we reflect the changes
    this.domElement.style.bottom = this.positionY + "vh";
  }
}

/////////////////////////////////// beginning of globale scope ///////////////////////////////////

const game = new Game();
game.start();