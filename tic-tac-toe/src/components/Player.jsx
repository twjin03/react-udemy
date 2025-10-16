import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing); // 여기서 editing은 이전 상태 값 isEditing을 의미 

    if (isEditing) {
      onChangeName({symbol, newName: playerName});
    }
  }

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  // 플레이어 이름 표시 <-> 입력창 토글을 위한 변수 
  let editablePlayerName = <span className="player-name">{playerName}</span>

  if (isEditing) {
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
  }

  return (
    <li className={isActive ? 'active' : ""}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}