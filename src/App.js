import { useState } from "react";
function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    // changing so the currently sleected move is rendered instead
    // of always rendering the final move

    // const currentSquares = history[history.length - 1];
    const currentSquares = currentMove < history.length ? history[currentMove] : undefined;
    console.log(history[currentMove]);
    console.log("Current Squaress", currentSquares);

    function handlePlay(nextSquares) {
        /* 
        * when we go back in time, we want to add nextSquares after the portion of history we have
        * Hence every time a move is made, currentMove should be updated to the latest move 
        */
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        console.log("Next History", nextHistory);
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }
    
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        // true if 0, false if 1
    }

    // Moved between all the arrays in the history array
    // Move is the index of the arrays in the history array

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        console.warn("history after call", history);
        console.warn(`Length ${history.length}\n Move ${move} history:\n ${history}`);
        console.warn("Current Squares array", currentSquares);
        return (
            <>
                <li key={move}>
                    <button className="historyButton" onClick={() => jumpTo(move)}>{description}</button>
                </li>
            </>
        )
    });


    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

function Board({ xIsNext, squares, onPlay }) {
    const [status, setStatus] = useState("");
    function handleClick(i) {
        console.log("Squarrrrrrrrrres in Game", squares);
        if (squares && (calculateWinner(squares) || squares[i])) {
            return
        };
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        // updates the state of squares, triggers re-rendering of the components
        // that depend on the squares state
        onPlay(nextSquares);

        const winner = calculateWinner(nextSquares)
        setStatus((prevStatus) => {
            const newStatus = winner ? "Winner: " + winner : "Next player: " + (!xIsNext ? "X" : "O")
            console.log("status after" + newStatus);
            console.log("X is next" + xIsNext + "and" + xIsNext ? "X" : "O");
            return newStatus;

        })
        console.log(winner);
    }
    return (
        <>
            <div className="board">

                <div className="status">
                    {status}
                </div>
                <div className="board-row">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                </div>

                <div className="board-row">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                </div>
            </div>
        </>
    )
}


function calculateWinner(squares) {
    const winnins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winnins.length; i++) {
        const [a, b, c] = winnins[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

