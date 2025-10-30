const GRID_WIDTH = 7;
const GRID_HEIGHT = 6;
const boardSquares = new Map();
let playerTurn = 0;
let started = false;
let ended = false;

function setupGrid () {
    let board = document.getElementById("board");
    board.style.gridTemplateColumns = "repeat("+GRID_WIDTH+", 1fr)";
    board.style.width = (75*GRID_WIDTH)+"px";
    board.style.height = (75*GRID_HEIGHT)+"px";
    for(let i=0; i < GRID_HEIGHT * GRID_WIDTH; i++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.id = i;
      
        boardSquares.set(i, 0);
        board.appendChild(cell);
    }
}

function startGame () {
    playerTurn = 1;
    let status = document.getElementById("status");
    status.innerText = "Player " + playerTurn + "'s turn"
    started = true;
    placePiece();
};
function resetGame () {
    playerTurn = 0;
    let status = document.getElementById("status");
    status.innerText = "Waiting for game to start"
    started = false;
    ended = false;
    for(let i=0; i < GRID_HEIGHT * GRID_WIDTH; i++) {
        boardSquares.set(i, 0);
    }
    let p1 = document.querySelectorAll(".cell");
    p1.forEach((value) => {
        while(value.firstChild) {    
            value.removeChild(value.firstChild);
        }
    }); 
};
function switchTurn() {
    if(!started) {return;} else {
    let status = document.getElementById("status");
    switch (playerTurn) {
        case 1:
            playerTurn = 2;        
            status.innerText = "Player " + playerTurn + "'s turn"
            break;
        case 2:
            playerTurn = 1;
            status.innerText = "Player " + playerTurn + "'s turn"
            break;
        default:
            console.log("Error; incorrect player value");
    }
    }
}

function startButton() {
    b1 = document.querySelector("#start");
    b1.addEventListener("click", function() { 
        if(!started && !ended) {  
            b1.innerText = "Reset";
            startGame();
        } else {
            b1.innerText = "Start Game";
            resetGame();
        }
    })
    
}

function detectWin() {
    let status = document.getElementById("status");
    for (const [key, value] of boardSquares) {
        if(value > 0) {
            if (key >= GRID_WIDTH * 3) {
                if( boardSquares.get(key) == boardSquares.get(key - 7) &&
                    boardSquares.get(key) == boardSquares.get(key - 14) &&
                    boardSquares.get(key) == boardSquares.get(key - 21)
                ) {started = false; status.innerText = "Player " + playerTurn + " has won!"; ended = true;}
            } 
            if (key % GRID_WIDTH >= 3) {
                if( boardSquares.get(key) == boardSquares.get(key - 1) &&
                    boardSquares.get(key) == boardSquares.get(key - 2) &&
                    boardSquares.get(key) == boardSquares.get(key - 3)
                ) {status.innerText = "Player " + playerTurn + " has won!"; started = false;  ended = true;}
            }
            if (key % GRID_WIDTH >= 3 && key >= GRID_WIDTH * 3) {
                if( boardSquares.get(key) == boardSquares.get(key - 1 - 7) &&
                    boardSquares.get(key) == boardSquares.get(key - 2 - 14) &&
                    boardSquares.get(key) == boardSquares.get(key - 3 - 21)
                ) {status.innerText = "Player " + playerTurn + " has won!"; started = false;  ended = true;}
            }
            if (key % GRID_WIDTH >= 3 && key <= (GRID_HEIGHT * GRID_WIDTH) - (GRID_WIDTH * 3)) {
                if( boardSquares.get(key) == boardSquares.get(key - 1 + 7) &&
                    boardSquares.get(key) == boardSquares.get(key - 2 + 14) &&
                    boardSquares.get(key) == boardSquares.get(key - 3 + 21)
                ) {status.innerText = "Player " + playerTurn + " has won!"; started = false;  ended = true;}
            }
        }
    }
}

function placePiece() { 
    let p1 = document.querySelectorAll(".cell");
    p1.forEach((value) => {
        value.addEventListener("click", function() {
            pieceClicked(value);
        });
    });   
}

function pieceClicked(value) {
    let cellID = parseInt(value.id);
    if(!started) {return;} else {
    if (cellID >= (GRID_HEIGHT * GRID_WIDTH) - GRID_WIDTH || boardSquares.get(cellID + GRID_WIDTH) > 0) {
        if(boardSquares.get(cellID) == 0) {
            let piece = document.createElement("img");
            piece.className = "piece"         
            switch (playerTurn) {
                case 0:
                    console.log("game not started!")
                    break;
                case 1:
                    boardSquares.set(cellID, 1)
                    piece.src = "./images/red_piece.png";
                    piece.alt = "red piece";         
                    value.appendChild(piece);
                    detectWin();
                    break;
                case 2:
                    boardSquares.set(cellID, 2)
                    piece.src = "./images/blue_piece.png";
                    piece.alt = "blue piece";               
                    value.appendChild(piece);
                    detectWin();
                    break;
                default:
                    console.log("Error; incorrect player value");
            }
            //console.log(boardSquares);
            switchTurn();
        }
    }}
}
function loadImages(data) {
    
}
function load() {
    setupGrid();  
    startButton();
    console.log(boardSquares);
}

load();