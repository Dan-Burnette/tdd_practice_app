import React from "react";
import autobind from "autobind-decorator";
import { TodoList } from "./interfaces";
import TodoForm from "./TodoForm";
import "./App.css";

@autobind
class App extends React.Component<TodoList, TodoList> {
  constructor(props: TodoList) {
    super(props);
    this.state = props;
  }

  createTodo(description: string) {
    const newTodo = { description: description, complete: false };
    const newTodosState = [...this.state.todos, newTodo];
    this.setState({ todos: newTodosState });
  }

  deleteTodo(event: React.MouseEvent<HTMLButtonElement>, description: string) {
    event.preventDefault();
    const newTodosState = this.state.todos.filter((item) => {
      return item.description !== description;
    });
    this.setState({ todos: newTodosState });
  }

  todos() {
    return this.state.todos.map((todo, idx) => {
      return (
        <li key={idx}>
          {todo.description}
          <button onClick={(e) => this.deleteTodo(e, todo.description)}>
            Delete
          </button>
        </li>
      );
    });
  }

  render() {
    const todos = this.todos();
    return (
      <div className="App">
        <header className="App-header">Todo Application</header>

        <TodoForm todos={this.state.todos} createTodo={this.createTodo} />

        <ul>{todos}</ul>
      </div>
    );
  }
}

export default App;
