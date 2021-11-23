import React from "react";
import autobind from "autobind-decorator";
import { Todo, TodoList } from "./interfaces";
import NewTodoForm from "./NewTodoForm";
import EditTodoForm from "./EditTodoForm";
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

  toggleTodoCompletion(todo: Todo) {
    const newTodosState = this.state.todos.map((t) => {
      if (todo.description === t.description) {
        return { description: todo.description, complete: !todo.complete };
      } else {
        return t;
      }
    });

    this.setState({ todos: newTodosState });
  }

  deleteTodo(todo: Todo) {
    const newTodosState = this.state.todos.filter((t) => t !== todo);
    this.setState({ todos: newTodosState });
  }

  todos() {
    const { toggleTodoCompletion, deleteTodo } = this;
    return this.state.todos.map((todo, idx) => {
      return (
        <li key={idx}>
          <EditTodoForm
            todo={todo}
            toggleTodoCompletion={toggleTodoCompletion}
            deleteTodo={deleteTodo}
          />
        </li>
      );
    });
  }

  render() {
    const todos = this.todos();
    return (
      <div className="App">
        <header className="App-header">Todo Application</header>
        <NewTodoForm todos={this.state.todos} createTodo={this.createTodo} />
        <ul>{todos}</ul>
      </div>
    );
  }
}

export default App;
