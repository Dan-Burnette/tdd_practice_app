import React, { useState } from "react";
import { Todo, TodoList } from "./interfaces";
import NewTodoForm from "./NewTodoForm";
import EditTodoForm from "./EditTodoForm";
import "./App.css";

function App(props: TodoList) {
  const [todos, setTodos] = useState(props.todos);

  const createTodo = (description: string) => {
    const newTodo = { description: description, complete: false };
    const newTodosState = [...todos, newTodo];
    setTodos(newTodosState);
  };

  const toggleTodoCompletion = (todo: Todo) => {
    const newTodosState = todos.map((t) => {
      if (t === todo) {
        return { description: todo.description, complete: !todo.complete };
      } else {
        return t;
      }
    });
    setTodos(newTodosState);
  };

  const deleteTodo = (todo: Todo) => {
    const newTodosState = todos.filter((t) => t !== todo);
    setTodos(newTodosState);
  };

  return (
    <div className="App">
      <header className="App-header">Todo Application</header>
      <NewTodoForm todos={todos} createTodo={createTodo} />
      <ul>
        {todos.map((todo, idx) => {
          return (
            <li key={idx}>
              <EditTodoForm
                todo={todo}
                toggleTodoCompletion={toggleTodoCompletion}
                deleteTodo={deleteTodo}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
