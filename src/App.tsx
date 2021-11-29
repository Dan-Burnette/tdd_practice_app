import React, { useState } from "react";
import { Todo, TodoList } from "./interfaces";
import NewTodoForm from "./NewTodoForm";
import EditTodoForm from "./EditTodoForm";
import Filters from "./Filters";
import "./App.css";

function App(props: TodoList) {
  const [todos, setTodos] = useState(props.todos);
  const [filterParams, setFilterParams] = useState({
    description: "",
    complete: false,
  });

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

  const filteredTodos = () => {
    return todos.filter((todo) => {
      const descriptionMatch = todo.description.includes(
        filterParams.description
      );
      const completionMatch = todo.complete === filterParams.complete;
      return descriptionMatch && completionMatch;
    });
  };

  return (
    <div className="App">
      <header className="App-header">My Todos</header>
      <NewTodoForm todos={todos} createTodo={createTodo} />
      <Filters params={filterParams} setFilterParams={setFilterParams} />
      <ul>
        {filteredTodos().map((todo, idx) => {
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
