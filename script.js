const boardGrid = document.querySelector(".board");
const boxList = document.getElementsByClassName("box");
const startButton = document.querySelector(".start");
const restartButton = document.querySelector(".restart");
const player1NameInput = document.querySelector("#player1NameInput");
const player2NameInput = document.querySelector("#player2NameInput");

//GameBoard Module
const gameBoard = (() => {
    let board = ["","","","","","","","",""];

    const drawBoard = () => {
        for(let i = 1; i <= gameBoard.getBoard().length; i++) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class","box");
            newDiv.setAttribute("id", i);
            newDiv.style.cursor = "pointer";
            
            newDiv.innerHTML = gameBoard.getBoard()[i-1];
            boardGrid.append(newDiv);
        }
    }

    const getBoard = () => board;
    const updateBoardBox = (e) => {
       let index =  e.target.getAttribute("id");
       board[index-1] = displayController.currentPlayer.getSign();
    }
    const resetBoard = () => {board = ["","","","","","","","",""];}

    return {
        getBoard, updateBoardBox, resetBoard, drawBoard
    };
})();

//DisplayController Module
const displayController = (() => {
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

    let currentPlayer = null;

    const setupGame = () => {
        gameBoard.drawBoard();
        boardGrid.style.opacity="0.4";
    }

    const startGame = () => {
        boardGrid.style.opacity = "1";

        if(player1NameInput.value == ""){
            player1.setName("Player 1");
        } else {
            player1.setName(player1NameInput.value);
        }

        if(player2NameInput.value == ""){
            player2.setName("Player 2");
        } else {
            player2.setName(player2NameInput.value);
        }
        
        displayController.currentPlayer = player1;

        Array.from(boxList).forEach(box => {           
            box.addEventListener("click", e => {
                displayMove(e)
            });
        });
    }
    
    const displayMove = (e) => {
        //set Sign in box of currentPlayer
        if(e.target.innerHTML != ""){
            alert("Box already taken!");
        } else {
            e.target.innerHTML = displayController.currentPlayer.getSign();
            displayController.numberOfTurns++;
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
        let winner = false;
        
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
                setTimeout(function(){alert(`${player1.getName()} HAS WON`)},100);
                setTimeout(function(){restartGame();},3000);
                winner = true;
            }
            if(checker(oPositions, winningCombos[w]) && oPositions.length >= 3){
                setTimeout(function(){alert(`${player2.getName()} HAS WON`)},100);
                setTimeout(function(){restartGame();},3000);
                winner = true;
            }
        }
        
        if(displayController.numberOfTurns < 9){
            return;
        } else if (displayController.numberOfTurns >= 9 && !winner) {
            setTimeout(function(){alert("Game is Over! Tie Match!")},100);
            setTimeout(function(){restartGame();},3000);
        } 
    }
    
    const restartGame = () => {
        boardGrid.innerHTML = "";
        gameBoard.resetBoard();
        displayController.currentPlayer = player1;
        displayController.numberOfTurns = 0;
        boardGrid.style.opacity = "0.4";
        setupGame();
        startGame();
    }

    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", restartGame);

    return {
     displayMove, setupGame, startGame, currentPlayer, restartGame, numberOfTurns
    };
})();

//Player Factory
const Player = (name, sign) => {
    let playerName = name;
    const getName = () => playerName;
    const getSign = () => sign;
    const setName = (newName) => {playerName = newName};
    return {getName, getSign, setName}
};

// ON GAME START
displayController.setupGame();
const player1 = Player("me","X");
const player2 = Player("cpu","O");


// DONE LOGIC Function um zu schauen ob schon jemand gewonnen hat


//eventlistener beim grid in startGame rein

// TODO
// DONE Gewinnermeldung
// DONE Spielername eingeben, Sign eingeben
// DONE Buttons (Reset)
// DONE Design
// Checken wie sich andere executen (wenn alles in factory/ modules sind) // einfach alles über startbutton event
// demensprechend weiter versuchen alles zu verpacken // Players auch in start game
// Verantwortlichkeiten nochmal checken

