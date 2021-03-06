/****  GAME CONFIGS */

var gameKeysEnums = {
    ARROW_UP : "ArrowUp",
    ARROW_DOWN: "ArrowDown",
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight"
}

var snakeDirectionsEnum = {
    ERROR : 0,
    RIGHT : 1,
    LEFT : 2,
    TOP : 3,
    BOTTOM  : 4
};

const maxLineAmount = 21;
const maxLineSize = 42;
const totalTiles = maxLineAmount * maxLineSize;

const startColumn = 12;
const startLine = 24;

//TODO: Learn to calculate Column and Line intersection
const startTile = 439;

/**** --- GAME CONFIGS ------*/
let currentFoodPositionId = null;
let isGameRunning = false;
let currentSnakeDirection = snakeDirectionsEnum.ERROR;
let snakeHeadId;
let snakeSize = 5;
let snakeBodyIdsArray = [];
let snakeHeadTile = null;
let borderIds = [];

function initializeGameMap() {
    var gameContentDocument = document.getElementsByClassName('gameContent')[0];
    for (let i = 0; i < totalTiles; i++) {
        var newTile = document.createElement('div');
        newTile.id = i;
        newTile.classList.add('gameTile');
        gameContentDocument.appendChild(newTile);
    }

    setBorderTiles();
}

function initializeSnake() {
    snakeHeadId = startTile;
    lastSnakeHeadPositionId = snakeHeadId;
    snakeBodyIdsArray.push(snakeHeadId);
    var snakeHeadTileElement = document.getElementById(startTile);
    snakeHeadTileElement.classList.add('snakeBodyTile');

    for (i = 0; i < snakeSize; i++) {
        var newSnakeBodyId = snakeHeadId - snakeBodyIdsArray.length;
        snakeBodyIdsArray.push(newSnakeBodyId);
        document.getElementById(newSnakeBodyId).classList.add('snakeBodyTile');
    }
}

function startGame() {
    isGameRunning = true;
    currentSnakeDirection =  snakeDirectionsEnum.RIGHT;

    setTimeout(runningGame, 3000);
}

function runningGame() {
    moveSnake();
    setTimeout(runningGame, 100);
}

function moveSnake() {
    let lastPreviousTilePositionId = undefined;

    for (let i = 0; i < snakeBodyIdsArray.length; i++) {
        unmarkSnakePosition(snakeBodyIdsArray[i]);
        const isHeadId = snakeBodyIdsArray[i] === snakeHeadId;

        const previousPositionAux = snakeBodyIdsArray[i];
        
        if(isHeadId) {
            switch (currentSnakeDirection) {
                case snakeDirectionsEnum.TOP:
                    moveToUpHandle(i);
                    break;
                case snakeDirectionsEnum.BOTTOM:
                    moveToBottomHandle(i);
                    break;
                case snakeDirectionsEnum.RIGHT:
                    moveToRightHandle(i);
                    break;
                case snakeDirectionsEnum.LEFT:
                    moveToLeftHandle(i);
                    break;
            }
            snakeHeadId = snakeBodyIdsArray[i];

            if (snakeHeadId === currentFoodPositionId) {
                resetSnakeFood();
                snakeGrowth();
            } else if(isBorderTile(snakeHeadId)){
                alert("GameOver");
            }

        } else {
            snakeBodyIdsArray[i] = lastPreviousTilePositionId;
        }
        
        lastPreviousTilePositionId = previousPositionAux;
        markSnakePosition(snakeBodyIdsArray[i]);
    };
}

function markSnakePosition(snakeBodyTileId) {
    var snakeTileElement = document.getElementById(snakeBodyTileId);
    snakeTileElement.classList.add('snakeBodyTile');
}

function unmarkSnakePosition(snakeBodyTileId) {
    var snakeTileElement = document.getElementById(snakeBodyTileId);
    snakeTileElement.classList.remove('snakeBodyTile');
}

function initializeKeyboardHandle() {
    document.addEventListener('keydown', (event) => {
        switch (event.key){
            case gameKeysEnums.ARROW_UP:
                if(currentSnakeDirection !== snakeDirectionsEnum.BOTTOM)
                    currentSnakeDirection = snakeDirectionsEnum.TOP;
                break;
            case gameKeysEnums.ARROW_DOWN:
                if(currentSnakeDirection !== snakeDirectionsEnum.TOP)
                    currentSnakeDirection = snakeDirectionsEnum.BOTTOM;
                break;
            case gameKeysEnums.ARROW_LEFT:
                if(currentSnakeDirection !== snakeDirectionsEnum.RIGHT)
                    currentSnakeDirection = snakeDirectionsEnum.LEFT;
                break;
            case gameKeysEnums.ARROW_RIGHT:
                if(currentSnakeDirection !== snakeDirectionsEnum.LEFT)
                    currentSnakeDirection = snakeDirectionsEnum.RIGHT;
                break;
        }
    })
}

function moveToUpHandle(tileIndex) {
    snakeBodyIdsArray[tileIndex] = snakeBodyIdsArray[tileIndex] - maxLineSize;
}

function moveToBottomHandle(tileIndex) {
    snakeBodyIdsArray[tileIndex] = snakeBodyIdsArray[tileIndex] + maxLineSize;
}

function moveToRightHandle(tileIndex) {
    snakeBodyIdsArray[tileIndex] = snakeBodyIdsArray[tileIndex] + 1; 
}

function moveToLeftHandle(tileIndex) {
    snakeBodyIdsArray[tileIndex] = snakeBodyIdsArray[tileIndex] - 1; 
}

function resetSnakeFood() {
    if (currentFoodPositionId !== undefined && currentFoodPositionId !== null) {
        const currentFoodElement = document.getElementById(currentFoodPositionId);
        currentFoodElement.classList.remove('snakeFood');
    }

    var totalTiles = maxLineSize * maxLineAmount; 
    var randomPositionId = Math.floor( Math.random() * (+totalTiles - 0)) + +0;

    while(isSnakeBodyId(randomPositionId) || isBorderTile(randomPositionId)) {
        randomPositionId = Math.floor( Math.random() * (+totalTiles - 0)) + +0;
    }


    var foodDocument = document.getElementById(randomPositionId);
    foodDocument.classList.add('snakeFood');
    currentFoodPositionId = randomPositionId;
}

function snakeGrowth() {
    var lastSnakeTile = snakeBodyIdsArray[snakeBodyIdsArray.length - 1];
    let newSnakeTile = null;
    switch(currentSnakeDirection) {
        case snakeDirectionsEnum.TOP:
            newSnakeTile = lastSnakeTile + maxLineSize;
            break;
        case snakeDirectionsEnum.BOTTOM:
            newSnakeTile = lastSnakeTile - maxLineSize;
            break;
        case snakeDirectionsEnum.LEFT:
            newSnakeTile = lastSnakeTile + 1;
            break;
        case snakeDirectionsEnum.RIGHT:
            newSnakeTile = lastSnakeTile - 1;
            break;
    }

    snakeBodyIdsArray.push(newSnakeTile);
    markSnakePosition(newSnakeTile);
}

function isSnakeBodyId(tileId) {
    var isASnakeBodyPosition = snakeBodyIdsArray.includes(tileId);
    return isASnakeBodyPosition;
}

function setBorderTiles() {
    let documentTile;

    //Top Border
    for(let i = 0; i < maxLineSize; i++) {
        borderIds.push(i);
        documentTile = document.getElementById(i);
        documentTile.classList.add("borderTile");
    }

    //Left Border
    for(let i = maxLineSize; i < totalTiles - maxLineSize; i += maxLineSize) {
        borderIds.push(i);
        documentTile = document.getElementById(i);
        documentTile.classList.add("borderTile");
    }

    // Right Border
    for(let i = (maxLineSize * 2)  - 1; i < totalTiles - maxLineSize; i += maxLineSize) {
        borderIds.push(i);
        documentTile = document.getElementById(i);
        documentTile.classList.add("borderTile");
    }

    //Bottom Border
    for(let i = totalTiles - maxLineSize; i < totalTiles; i++) {
        borderIds.push(i);
        documentTile = document.getElementById(i);
        documentTile.classList.add("borderTile");
    }
}

function isBorderTile(tileId) {
    return borderIds.find((id) => id === tileId) !== undefined;
}