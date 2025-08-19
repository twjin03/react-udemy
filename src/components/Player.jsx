import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing); // 여기서 editing은 이전 상태 값 isEditing을 의미 
  }

  let playerName = <span className="player-name">{name}</span>

  if (isEditing) {
    playerName = <input type="text" required value={name}/>;
  }

  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}