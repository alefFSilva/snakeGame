/****  GAME CONFIGS */
const maxLineAmount = 21;
const maxLineSize = 42;
const totalTiles = maxLineAmount * maxLineSize;

const startColumn = 12;
const startLine = 24;

//TODO: Learn to calculate Column and Line intersection
const startTile = 439;

/**** --- GAME CONFIGS ------*/

let gameRunning;

let snakeHeadId;
let snakeSize = 5;
let snakeBodyIdsArray = [];
let snakeHeadTile = null;

function initializeGameMap() {
    var gameContentDocument = document.getElementsByClassName('gameContent')[0];
    for(let i = 0; i < totalTiles; i++) {
        var newTile = document.createElement('div');
        newTile.id = i;
        newTile.classList.add('gameTile');
        gameContentDocument.appendChild(newTile);
    } 
}

function initializeSnake() {
    snakeHeadId = startTile;
    snakeBodyIdsArray.push(newSnakeBodyId);
    var snakeHeadTileElement = document.getElementById(startTile);
    snakeHeadTileElement.classList.add('snakeBodyTile');

    for(i = 0; i < snakeSize; i++) {
        var newSnakeBodyId = snakeHeadId - snakeBodyIdsArray.length;
        snakeBodyIdsArray.push(newSnakeBodyId);
        document.getElementById(newSnakeBodyId).classList.add('snakeBodyTile');
    }
}

function startGame() {
    gameRunning = true;

    while(gameRunning) {
        console.log('se passaram 3 segundos');
    }
}