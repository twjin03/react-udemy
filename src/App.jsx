import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

// 헬퍼 함수 
function deriveActivePlayer(gameTurns) {
  let currnetPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currnetPlayer = 'O';
  }
  return currnetPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      const currnetPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns} />
      </div>

      <Log turns={gameTurns} />
    </main >
  );
}

export default App;
