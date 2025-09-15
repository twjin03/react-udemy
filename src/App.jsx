import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  // 플레이어 토글 기능 수행하는 함수
  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      let currnetPlayer = 'X';
      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currnetPlayer = 'O';
      }
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

      <Log turns={gameTurns}/>
    </main >
  );
}

export default App;
