import { createContext, FC, ReactNode, useState } from "react";
import Todo from "../models/todo";

type TodosContextObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
}

export const TodosContext = createContext<TodosContextObj>({
  items: [],
  addTodo: () => { },
  removeTodo: (id: string) => { },
});
type TodosContextProviderProps = {
  children?: ReactNode;
};
const TodosContextProvider: FC<TodosContextProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo)
    });
  };
  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.id !== todoId);
    });
  };

  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  };
  return <TodosContext.Provider value={contextValue}>
    {children}
  </TodosContext.Provider>
}

export default TodosContextProvider; 