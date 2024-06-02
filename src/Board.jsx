import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};
const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};
const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "black",
  cursor: "pointer",
};
const rowStyle = {
  display: "flex",
};
function Square({ value, onClick }) {
  return (
    <div className="square" style={squareStyle} onClick={onClick}>
      {value}
    </div>
  );
}
function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    console.log(winner);
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    setWinner(calculateWinner(newSquares));
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }

    return null;
  };

  const renderSquare = (index) => (
    <Square value={squares[index]} onClick={() => handleClick(index)} />
  );

  return (
    <div style={containerStyle}>
      <div style={instructionsStyle}>
        Next Player: <span>{xIsNext ? "X" : "O"}</span>
      </div>
      <div style={instructionsStyle}>
        Winner: <span>{winner ? winner : "None"}</span>
      </div>
      <button style={buttonStyle} onClick={handleReset}>
        Reset
      </button>
      <div style={boardStyle}>
        <div style={rowStyle}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div style={rowStyle}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div style={rowStyle}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}

export default Board;
