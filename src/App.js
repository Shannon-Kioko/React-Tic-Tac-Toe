import { useState } from "react";
function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [status, setStatus] = useState("");
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
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
        setSquares(nextSquares);
        setXIsNext(!xIsNext)
        console.log(squares);
        console.log('Nexxxxxxxt', nextSquares);

        console.log("status b4444444444444" + status);
        const winner = calculateWinner(nextSquares)
        setStatus((prevStatus) => {
            const newStatus = winner ? "Winner: " + winner : "Next player: " + (!xIsNext ? "X" : "O")
            console.log("status after" + newStatus);
            console.log("X is next" + xIsNext + "and" + xIsNext? "X" : "O");
            return newStatus;

        })
        console.log("status afteeeeeeeeeeeerrrrrrrrrrrrrr" + status);
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
            console.log(squares[a], squares[b], squares[c]);
            return squares[a];
        }
    }
    return null;
}

