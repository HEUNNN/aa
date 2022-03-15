import "./App.css";
import TodoInsert from "./Components/TodoInsert";
import TodoList from "./Components/TodoList";
import TodoTemplate from "./Components/TodoTemplate";
import { useRef, useCallback, useReducer, useEffect } from "react";
import { parse } from "../../../../Library/Caches/typescript/4.6/node_modules/@babel/parser/typings/babel-parser";

const todoReducer = (todos, action) => {
  let newTodos = []; //localStorage를 사용하기 위함
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "INSERT": {
      // { type:"INSERT", newtodo: { id:1, text: 'new todo 1', checked: false } }
      newTodos = [...todos, action.newTodo];
      break;
    }
    case "REMOVE": {
      newTodos = todos.filter((todo) => todo.id !== action.targetId);
      break;
    }
    case "TOGGLE": {
      newTodos = todos.map((todo) =>
        todo.id === action.targetId ? { ...todo, checked: !todo.checked } : todo
      );
      break;
    }
    default:
      return todos;
  }
  localStorage.setItem("todo", JSON.stringify(newTodos));
  return newTodos;
};

function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const nextId = useRef(0);

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem("todo"));
    if (localTodos) {
      const todolist = JSON.parse(localTodos).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      if (todolist.length >= 1) {
        nextId.current = parseInt(todolist[0].id) + 1;
      }
    }
    dispatch({ type: "INIT", data: localTodos });
  }, []);

  const onInsert = useCallback((text) => {
    const newTodo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: "INSERT", newTodo });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onToggle = useCallback((targetId) => {
    dispatch({ type: "TOGGLE", targetId });
  }, []);

  return (
    <div className="App">
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </TodoTemplate>
    </div>
  );
}

export default App;
