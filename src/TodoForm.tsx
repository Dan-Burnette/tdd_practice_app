import React from 'react';

interface TodoFormProps {
  createTodo:
    (event: React.MouseEvent<HTMLButtonElement>, description: string) => void
}

interface TodoFormState {
  inputValue: string
}

class TodoForm extends React.Component<TodoFormProps, TodoFormState> {

  constructor(props: TodoFormProps) {
    super(props);
    this.state = { inputValue: '' }
    this.updateInputValue = this.updateInputValue.bind(this)
  }

  updateInputValue(event: React.FormEvent<HTMLInputElement>) {
    this.setState({inputValue: event.currentTarget.value});
  }

  render() {
    const { createTodo } = this.props;
    return (
      <form name="todo-form">
        <label htmlFor="new-todo">New Todo</label>
        <input
          type="text" id="new-todo" name="new-todo"
          value={this.state.inputValue}
          onChange={this.updateInputValue}
        />
        <button
          type="submit"
          onClick={(e) => createTodo(e, this.state.inputValue)}>
          Create
        </button>
      </form>
    );
  }

}

export default TodoForm;
