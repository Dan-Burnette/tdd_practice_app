import React from "react";
import autobind from "autobind-decorator";
import { Todo } from "./interfaces";

interface NewTodoFormProps {
  todos: Todo[];
  createTodo: (description: string) => void;
}

interface NewTodoFormState {
  inputValue: string;
  errorMessage: string;
}

@autobind
class NewTodoForm extends React.Component<NewTodoFormProps, NewTodoFormState> {
  constructor(props: NewTodoFormProps) {
    super(props);
    this.state = { inputValue: "", errorMessage: "" };
  }

  updateInputValue(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ inputValue: event.currentTarget.value });
  }

  reset() {
    this.setState({ inputValue: "", errorMessage: "" });
  }

  todoExists(description: string) {
    const { todos } = this.props;
    const match = todos.find((t) => t.description === description);
    return match !== undefined;
  }

  handleFormSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const alreadyExists = this.todoExists(this.state.inputValue);
    const isBlank = this.state.inputValue.length === 0;
    if (alreadyExists) {
      this.setState({
        errorMessage: "You've already added that todo to your list.",
      });
    } else if (isBlank) {
      this.setState({
        errorMessage: "Oops! You can't add a blank todo!",
      });
    } else {
      this.props.createTodo(this.state.inputValue);
      this.reset();
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
      <form name="new-todo">
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

export default NewTodoForm;
