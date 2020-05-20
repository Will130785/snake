//Get UI elements
const squares = document.querySelectorAll(".grid div");
const scoreDisplay = document.querySelector(".currentScore");
const levelDisplay = document.querySelector(".currentLevel");
const levelUpDisplay = document.querySelector(".levelUp");
const startBtn = document.querySelector(".startBtn");

//Set game variables
const width = 20; //Grid width
let currentIndex = 0; //Current index of snake
let appleIndex = 0; //index of apple
let currentSnake = [2, 1, 0]; //Current snake
let direction = 1; //Direction tracker
let score = 0; //Score
let level = 0; //Level
let levelUp = 0; //Level up tracker
let speed = 0.9; //Game speed
let intervalTime = 0; //interval Duration
let interval = 0; //interval function variable


//Function to start and restart game
function startGame() {
    //Remove current position of snake and apple
    currentSnake.forEach(index => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    //Clear the interval
    clearInterval(interval);
    //Set score back to 0
    score = 0;
    //Set level and level tracker back to 0
    level = 0;
    levelUp = 0;
    //Set level up display to nothing
    levelUpDisplay.textContent = "";
    //Generate new random apple
    randomApple();
    //Set direction to right
    direction = 1;
    //Reset score display and interval time
    scoreDisplay.textContent = score;
    intervalTime = 400;
    //Reset snake and index
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    //Loop through snake and add to restarted position
    currentSnake.forEach(index => squares[index].classList.add("snake"));
    //Start interval;
    interval = setInterval(moveOutcomes, intervalTime);

    //Change button text to restart
    startBtn.textContent = "Restart";
}

//Function to determine outcome of move
function moveOutcomes() {
    //Check the direction and position
    if(
        (currentSnake[0] + width >= (width * width) && direction === width) || //If snake hists bottom border
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right border
        (currentSnake[0] % width === 0 && direction === -1) || //If snkae hits left border
        (currentSnake[0] - width < 0 && direction === -width) || //If snake hits top border
        squares[currentSnake[0] + direction].classList.contains("snake") //If snake head hits itself
    ) {
        //Stop game
        levelUpDisplay.textContent = "GAME OVER!!!";
        return clearInterval(interval);
    }

    //Create tail variable and equal it to the end of snake index
    const tail = currentSnake.pop();
    //Remove snake class
    squares[tail].classList.remove("snake");
    //Add to the start of array
    currentSnake.unshift(currentSnake[0] + direction);

    //Check if snake eats an apple
    if(squares[currentSnake[0]].classList.contains("apple")) {
        levelUpDisplay.textContent = "";
        //Remove the apple and add to the tail of the snake
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        //Add to score
        score++;
        scoreDisplay.textContent = score;
        //Add to level up tracker
        levelUp++;
        if(levelUp === 5) {
            level++;
            levelDisplay.textContent = level;
            //Display level up in UI
            levelUpDisplay.textContent = "Level Up!!!";
           // Clear current interval
            clearInterval(interval);
            //Increase speed
            intervalTime = intervalTime * speed;
            //Start new interval
            interval = setInterval(moveOutcomes, intervalTime);

            levelUp = 0;
        }
        //Generate new random apple
        randomApple();
    }

    //Display snake in grid
    squares[currentSnake[0]].classList.add("snake");
}


//Function to generate apple
function randomApple() {
    do{
        appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}

//Function to control the snake
function control(e) {
    //Remove snake from current squares
    squares[currentIndex].classList.remove("snake");

    //Check which key is pressed
    if(e.keyCode === 39) {
        direction = 1;
    } else if(e.keyCode === 38) {
        direction = -width;
    } else if(e.keyCode === 37) {
        direction = -1;
    } else if(e.keyCode === 40) {
        direction = +width;
    }
}


//Event listeners
document.addEventListener("keyup", control);
startBtn.addEventListener("click", startGame);

// //Grab grid container in UI
// const gridContainer = document.querySelector(".grid");

// const ctx = gridContainer.getContext("2d");

// //Set grid layout
// const grid = [
//     1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
//     1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
// ];


// const layout = [];
// const width = 28;

// //Function to set grid upon page load
// function setGrid() {
//     //Loop through each item
//     grid.forEach((item, index) => {

//         //Create a div element, add square class and append to grid in UI
//         let div = document.createElement("div");
//         div.classList.add("square");
//         // gridContainer.appendChild(div);

//         //Check if Item is equal to 1 and if so set class to wall
//         if(item === 1) {
//             div.classList.add("wall");
//         }
//         layout.push(div);
//     });

//     layout.forEach((item, index) => {
//         gridContainer.appendChild(item);
//     })

//     // console.log(layout);
//     // console.log(grid);
// }


// setGrid();

// let snake = [3, 3, 3, 3, 3];

// let snakeStartIndex = 240;
// let snakeEndIndex = 244;


// function displaySnake() {
//     let i = snakeStartIndex;
//     for(let j = 0; j < snake.length; i++, j++) {
//         layout[i].classList.add("snake");
//         // console.log(i);
//     }
//     layout[snakeStartIndex].classList.add("snake-head");
// }

// displaySnake();

// function moveSnake(direction) {

//     setInterval(() => {

//         if(direction === "left") {
//             layout[snakeStartIndex].classList.remove("snake-head");
//             snakeStartIndex--;
//             layout[snakeStartIndex].classList.add("snake-head");
//             layout[snakeEndIndex].classList.remove("snake");
//             snakeEndIndex--;
//             displaySnake();
//         } else if(direction === "down") {
//             layout[snakeStartIndex].classList.remove("snake-head");
//             snakeStartIndex += width;
//             layout[snakeStartIndex].classList.add("snake-head");
//             layout[snakeEndIndex].classList.remove("snake");
//             snakeEndIndex += width;
//             displaySnake();
//         }
//         // } else if(direction === "")

//     }, 1000);
// }

// moveSnake();

// document.addEventListener("keyup", e => {
//     console.log(e);
//     if(e.keyCode === 37) {
//         moveSnake("left");
//     } else if(e.keyCode === 40) {
//         moveSnake("down");
//     }
// });