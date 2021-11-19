import React from "react";
import autobind from "autobind-decorator";

interface TodoFormProps {
  createTodo: (description: string) => void;
}

interface TodoFormState {
  inputValue: string;
}

@autobind
class TodoForm extends React.Component<TodoFormProps, TodoFormState> {
  constructor(props: TodoFormProps) {
    super(props);
    this.state = { inputValue: "" };
  }

  updateInputValue(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ inputValue: event.currentTarget.value });
  }

  resetInputValue() {
    this.setState({ inputValue: "" });
  }

  handleFormSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.props.createTodo(this.state.inputValue);
    this.resetInputValue();
  }

  render() {
    return (
      <form name="todo-form">
        <label htmlFor="new-todo">New Todo</label>
        <input
          type="text"
          id="new-todo"
          name="new-todo"
          value={this.state.inputValue}
          onChange={this.updateInputValue}
        />
        <button type="submit" onClick={this.handleFormSubmit}>
          Create
        </button>
      </form>
    );
  }
}

export default TodoForm;
