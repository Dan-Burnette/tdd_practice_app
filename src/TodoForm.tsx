import React from "react";
import autobind from "autobind-decorator";
import { Todo } from "./interfaces";

interface TodoFormProps {
  todos: Todo[];
  createTodo: (description: string) => void;
}

interface TodoFormState {
  inputValue: string;
  errorMessage: string;
}

@autobind
class TodoForm extends React.Component<TodoFormProps, TodoFormState> {
  constructor(props: TodoFormProps) {
    super(props);
    this.state = { inputValue: "", errorMessage: "" };
  }

  updateInputValue(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ inputValue: event.currentTarget.value });
  }

  resetInputValue() {
    this.setState({ inputValue: "" });
  }

  todoExists(description: string) {
    const { todos } = this.props;
    const match = todos.find((t) => t.description === description);
    return match !== undefined;
  }

  handleFormSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const alreadyExists = this.todoExists(this.state.inputValue);
    if (alreadyExists) {
      this.setState({
        errorMessage: "You've already added that todo to your list.",
      });
    } else {
      this.props.createTodo(this.state.inputValue);
      this.resetInputValue();
    }
  }

  errorMessage() {
    const { errorMessage } = this.state;
    const shouldDisplay = this.state.errorMessage.length > 0;
    return shouldDisplay ? <p role="alert">{errorMessage}</p> : null;
  }

  render() {
    const errorMessage = this.errorMessage();
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
          Create Todo
        </button>

        {errorMessage}
      </form>
    );
  }
}

export default TodoForm;
