import React from "react";
import autobind from "autobind-decorator";
import { Todo } from "./interfaces";

interface EditTodoFormProps {
  todo: Todo;
  toggleTodoCompletion: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

@autobind
class EditTodoForm extends React.Component<EditTodoFormProps> {
  handleUpdate(event: React.FormEvent<HTMLInputElement>) {
    const { todo, toggleTodoCompletion } = this.props;
    toggleTodoCompletion(todo);
  }

  handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo);
  }

  render() {
    const { todo } = this.props;

    return (
      <form name="edit-todo">
        <label htmlFor="edit-todo">{todo.description}</label>

        <input
          type="checkbox"
          id="edit-todo"
          name="edit-todo"
          onChange={this.handleUpdate}
          checked={todo.complete}
        />

        <button onClick={this.handleDelete}>Delete</button>
      </form>
    );
  }
}

export default EditTodoForm;
