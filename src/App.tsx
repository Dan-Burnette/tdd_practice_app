import React from 'react';
import Todo from './interfaces';
import TodoForm from './TodoForm';
import './App.css';

interface TodoProps {
  todos: Todo[]
}

class App extends React.Component<TodoProps> {

  constructor(props: TodoProps) {
    super(props);
    // console.log('props', props);
    // this.state = {
    //   todos: props.todos
    // };
  }

  todos() {
    const todos = this.props.todos;
    return todos.map((todo, idx) => {
      return(<p key={idx}>{todo.description}</p>)
    });
  }

  render() {
    const todos = this.todos();

    console.log("rendering todos which are:", todos);

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
