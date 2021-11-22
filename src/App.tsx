import React from "react";
import autobind from "autobind-decorator";
import TodoForm from "./TodoForm";
import "./App.css";

interface Todo {
  description: string;
  complete: boolean;
}

interface TodoList {
  todos: Todo[];
}

interface AppState {
  todos: Todo[];
  errorMessage: string;
}

@autobind
class App extends React.Component<TodoList, AppState> {
  constructor(props: TodoList) {
    super(props);
    this.state = {
      todos: props.todos,
      errorMessage: "",
    };
  }

  todoExists(todo: Todo) {
    const { todos } = this.state;
    const match = todos.find((t) => todo.description === t.description);
    return match !== undefined;
  }

  createTodo(description: string) {
    const newTodo = { description: description, complete: false };

    const alreadyExists = this.todoExists(newTodo);
    if (alreadyExists) {
      this.setState({
        errorMessage: "You've already added that todo to your list.",
      });
    } else {
      const newTodosState = [...this.state.todos, newTodo];
      this.setState({ todos: newTodosState, errorMessage: "" });
    }
  }

  deleteTodo(event: React.MouseEvent<HTMLButtonElement>, description: string) {
    event.preventDefault();
    const newTodosState = this.state.todos.filter((item) => {
      return item.description !== description;
    });
    this.setState({ todos: newTodosState, errorMessage: "" });
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

        <TodoForm createTodo={this.createTodo} />
        <p>{this.state.errorMessage}</p>

        <ul>{todos}</ul>
      </div>
    );
  }
}

export default App;
