class Player {
    constructor(){
        this.width = 10;
        this.height = 10;
        this.positionX = 50 - (this.width /2); // 50% = middle of the screen
        this.positionY = 0;
        
        this.domElement = null; // null = pointing to "nowhere", will be aded a value later
        // when we need a variable that needs to be accessed from multiple places, we store it
        // as a property

        this.createDomElement();
    }

    createDomElement(){
        // everytime we create a new player, we will be creaeting an 
        // element in the DOM

        // step1: create the element:
        this.domElement = document.createElement('div');
            // we just call it sth and create an element in the whole HTML
            // document, which is going to be div

        // step2: add content or modify (ex. innerHTML...)
         this.domElement.id = "player";
         this.domElement.style.width = this.width +"vw";
         this.domElement.style.height = this.height + "vh";
         this.domElement.style.bottom = this.positionY + "vh";
         this.domElement.style.left = this.positionX + "vw"
            // we think in a diagram-way, so x=0, y=0 means in the bottom left corner
            // x=100, y=100 means in the top right corner
        // domElement.setAttribute("src", "./mouth.png")

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
            // get a reference to the element "board" in the HTML file
        boardElm.appendChild( this.domElement);
            // once you have the reference, attach it to the parent element
            // in the HTML file

    }

    moveLeft(){
        if (this.positionX > 0){
            this.positionX -= 3;
            // this line above is only to check the code in the console
            this.domElement.style.left = this.positionX + "vw";
        }
    }

    moveRight(){
        if (this.positionX < 100){
            this.positionX += 3;
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
        this.positionX = 50 - (this.width /2);
        this.positionY = 85;

        this.domElement = null;
        this.createDomElement();
    }

    createDomElement(){
        // step1: create the element:
        this.domElement = document.createElement('div');

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

    moveDown(){
        // logic:
            //first, we have info stored in the code (class, constructor)
            // second, we modify the info of the class (here in the method)
        
        this.positionY -= 1;    
            // third, we update the info in CSS (DOM), i.e. we reflect the changes
        this.domElement.style.bottom = this.positionY + "vh";
        }
    }


///////////////////////////////////

const player = new Player();
const obstacles = [];

const obstacle1 = new Obstacle();

//Attach event listeners
 document.addEventListener('keydown', event => {
    // this is function notices when an event happen, i.e. the user presses 
    // a button on the keyboard
    if (event.key === "ArrowLeft"){  // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        player.moveLeft();
    // if the player presses the ArrowLeft, the function to move left will
    // be called on the player (the instance of the class Player)
    } else if (event.key === "ArrowRight"){
        player.moveRight();
    }
    // before, we found this code on StackOverFlow
});

// Create obstacles
setInterval(() => {
    const newObstacle = new Obstacle();
    obstacles.push(newObstacle);
}, 3000);


let time = 0;

//Move obstacles & detect collision
setInterval(() => {
    
    time++;
    // Create obstacles
    // time will be increased by one and if it hits 10 a new obstacle will 
    if(time % 10 === 0){
        const newObstacle = new Obstacle();
        obsArr.push(newObstacle);
    }

    obstacles.forEach( (obstacleInstance) => {

    //move current obstacle
    obstacleInstance.moveDown();

    const isCollision = player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
    player.positionX + player.width > obstacleInstance.positionX &&
    player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
    player.height + player.positionY > obstacleInstance.positionY

    //detect if there's a collision between player and current obstacle
    // --> player vs. obstacleInstance
    if (isCollision) {
        console.log("collision detected!!");
        // game over
    }


    });
}, 50)