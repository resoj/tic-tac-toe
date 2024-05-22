function Board() {
    const board = [];
    const rows = 3;
    const columns = 3;

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0 ; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const dropToken = (row, column, player) => {
        board[row][column].addToken(player);
    };

    const checkWinner = (playerName) => {

        //Tie logic

        const playerToken = playerName.token;
        // Check rows
        for (let i = 0; i < rows; i++) {
            if (
                board[i][0].getValue() === playerToken &&
                board[i][1].getValue() === playerToken &&
                board[i][2].getValue() === playerToken
            ) {
                return true;
            }
        }

        // Check columns
        for (let j = 0; j < columns; j++) {
            if (
                board[0][j].getValue() === playerToken &&
                board[1][j].getValue() === playerToken &&
                board[2][j].getValue() === playerToken
            ) {
                return true;
            }
        }

        // Check diagonals
        if (
            (board[0][0].getValue() === playerToken &&
             board[1][1].getValue() === playerToken &&
             board[2][2].getValue() === playerToken) ||
            (board[0][2].getValue() === playerToken &&
             board[1][1].getValue() === playerToken &&
             board[2][0].getValue() === playerToken)
        ) {

            return true;
        }

        return false;
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return {getBoard, dropToken, checkWinner, printBoard}
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Board();

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
      };

    const playRound = (row, column) => {
        if (board.getBoard()[row][column].getValue() !== 0) {
            console.log("This slot is already taken, try a different one.")
        }
        else {
            console.log(
                `Placing ${getActivePlayer().name}'s token into row ${row}, column ${column}...`
            );
            board.dropToken(row, column, getActivePlayer().token);
            const winner = board.checkWinner(getActivePlayer());
            if(winner) {
                console.log(`${getActivePlayer().name} Wins!` );
            }
            else if (winner === null) {
                console.log("Tie!");
            }
            else {
                switchPlayerTurn();
                printNewRound();
                board.printBoard;
            }

        }
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();