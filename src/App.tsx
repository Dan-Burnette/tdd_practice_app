import React from 'react';
import TodoForm from './TodoForm';
import './App.css';

interface Todo {
  description: string
}

interface TodoProps {
  todos: Todo[]
}

interface TodoState {
  todos: Todo[]
}

class App extends React.Component<TodoProps, TodoState> {

  constructor(props: TodoProps) {
    super(props);
    this.state = props;
  }

  todos() {
    return this.state.todos.map((todo, idx) => {
      return(<p key={idx}>{todo.description}</p>)
    });
  }

  render() {
    const todos = this.todos();

    return(
      <div className="App">
        <header className="App-header">
          Todo Application
        </header>

        <TodoForm />
        { todos }
      </div>
    );
  }

}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         Todo Application
//       </header>
//     </div>
//   );
// }

export default App;
