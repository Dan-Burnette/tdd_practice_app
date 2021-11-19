import React from 'react';
import TodoForm from './TodoForm';
import './App.css';

interface Todo {
  description: string,
  complete: boolean
}

interface TodoList {
  todos: Todo[]
}

class App extends React.Component<TodoList, TodoList> {

  constructor(props: TodoList) {
    super(props);
    this.state = props;
    this.createTodo = this.createTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  todos() {
    return this.state.todos.map((todo, idx) => {
      return(
      <li key={idx}>
        {todo.description}
        <button
          onClick={(e) => this.deleteTodo(e, todo.description)}>
          Delete
        </button>
      </li>)
    });
  }

  createTodo(event: React.MouseEvent<HTMLButtonElement>, description: string) {
    event.preventDefault();
    const newTodo = { description: description, complete: false };
    const newTodosState = [...this.state.todos, newTodo];
    this.setState({todos: newTodosState});
  }

  deleteTodo(event: React.MouseEvent<HTMLButtonElement>, description: string) {
    event.preventDefault();
    const newTodosState = this.state.todos.filter((item) => {
      return item.description !== description
    });
    console.log("newTodoState", newTodosState);
    this.setState({todos: newTodosState});
  }

  render() {
    const todos = this.todos();

    return(
      <div className="App">
        <header className="App-header">
          Todo Application
        </header>

        <TodoForm createTodo={this.createTodo} />

        <ul>
          { todos }
        </ul>
      </div>
    );
  }

}

export default App;
