import { useState } from "react";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState();

  function handleChange(e) {
    setEnteredTask(e.target.value);
  }

  function handleClick() {
    // 입력된 값을 app 컴포넌트로 보내기 
    // 입력란을 빈 칸으로 리셋 
    onAdd(enteredTask);
    setEnteredTask("");
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      <button className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >Add Task</button>
    </div>
  );
}