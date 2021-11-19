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
  }

  todos() {
    return this.state.todos.map((todo, idx) => {
      return(<p key={idx}>{todo.description}</p>)
    });
  }

  // TODO
  createTodo() {
  }

  render() {
    const todos = this.todos();

    return(
      <div className="App">
        <header className="App-header">
          Todo Application
        </header>

        <TodoForm createTodo={this.createTodo} />
        { todos }
      </div>
    );
  }

}

export default App;
