import React from "react";

// Functional Component 
const Todos: React.FC<{ items: string[] }> = (props) => {
  return <ul>
    {props.items.map(item => <li key={item}>{item}</li>)}
  </ul>
}

export default Todos; 