import React from 'react';
import TodoForm from './TodoForm';
import './App.css';

interface Todos {
  todos: Array<string>
}

class App extends React.Component<Todos, Todos> {

  constructor(props: Todos) {
    super(props);
    this.state = {
      todos: props.todos
    };
  }

  todos() {
    console.log("this.state is ", this.state);
    return this.state.todos.map((todo, idx) => {
      <p>{todo}</p>
    });
  }

  render(props) {
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
