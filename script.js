const boardGrid = document.querySelector(".board");

let numberOfTurns = 0;
const winningCombos = 
[[1,2,3],
 [4,5,6],
 [7,8,9],
 [1,4,7],
 [2,5,8],
 [3,6,9],
 [1,5,9],
 [3,5,7]
];



//GameBoard Module
const gameBoard = (() => {
    let board = ["","","","","","","","",""];
    const getBoard = () => board;
    const updateBoardBox = (e) => {
       let index =  e.target.getAttribute("id");
       board[index-1] = displayController.currentPlayer.getSign();
    }

    return {
        getBoard, updateBoardBox
    };
})();

//DisplayController Module
const displayController = (() => {

    let currentPlayer = null;
    
    const drawBoard = () => {
        for(let i = 1; i <= gameBoard.getBoard().length; i++) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class","box");
            newDiv.setAttribute("id", i);
            newDiv.style.border = "1px solid black";
            newDiv.style.cursor = "pointer";
            newDiv.addEventListener("click", e => {
                displayMove(e)
            })
            //newDiv.style.gridArea = newDiv.getAttribute("id");
            newDiv.innerHTML = gameBoard.getBoard()[i-1];
            boardGrid.append(newDiv);
        }
    }

    const displayMove = (e) => {
        //set Sign in box of currentPlayer
        if(e.target.innerHTML != ""){
            alert("Box already taken!");
        } else {
            e.target.innerHTML = displayController.currentPlayer.getSign();
            numberOfTurns++;
            gameBoard.updateBoardBox(e);
            checkBoardStatus();
            switchCurrentPlayer();
        }
        

    }

    const switchCurrentPlayer = () => {
        //switch to other Player
        if (displayController.currentPlayer == player1) {
            displayController.currentPlayer = player2;
        } else {
            displayController.currentPlayer = player1;
        }
    }

    const checkBoardStatus = () => {
        let oPositions = [];
        let xPositions = [];
        
        // store player's turns
        for(let i = 0; i < gameBoard.getBoard().length; i++) {

            if(gameBoard.getBoard()[i] == "X") {
                xPositions.push(i+1);
            } 

            if(gameBoard.getBoard()[i] == "O"){
                oPositions.push(i+1);
            }

        }
        
        // check with winning Combo if someone won
        let checker = (main, target) => target.every(v => main.includes(v));

        for(let w = 0; w < winningCombos.length; w++){

            if(checker(xPositions, winningCombos[w]) && xPositions.length >= 3){
                setTimeout(function(){alert("X HAS WON"),2000});
            }
            if(checker(oPositions, winningCombos[w]) && oPositions.length >= 3){
                setTimeout(function(){alert("O HAS WON"),2000});
            }
        }

        console.log(oPositions);
        console.log(xPositions);
        
        if(numberOfTurns < 9){
            return;
        } else {
            setTimeout(function(){alert("Game is Over!"),2000});
            
        }
        
    }
    
    
    return {
        drawBoard, displayMove, currentPlayer
    };
})();

//Player Factory
const Player = (name, sign) => {
    const getName = () => name;
    const getSign = () => sign;
    return {getName, getSign}
};

displayController.drawBoard();
const player1 = Player("me","X");
const player2 = Player("cpu","O");
displayController.currentPlayer = player1;
console.log(displayController.currentPlayer.getName());


// DONE LOGIC Function um zu schauen ob schon jemand gewonnen hat

// TODO
// Gewinnermeldung
// Spielername eingeben, Sign eingeben
// Buttons (Reset)
// Design

// CHECK
// Globals verhindern
// So gut wie möglich einpacke in Module / Factory
// Verantwortlichkeiten dementsprechend zufügen
