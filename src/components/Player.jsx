import { useState } from "react";

export default function Player({ initialName, symbol }) {
  const [playerName, setPlayerName] = useState(initialName); 
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing); // 여기서 editing은 이전 상태 값 isEditing을 의미 
  }

  function handleChange(e) {
    setPlayerName(e.target.value); 
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>

  if (isEditing) {
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
  }

  return (
    <li>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}