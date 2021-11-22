import React from "react";
import autobind from "autobind-decorator";

interface EditTodoFormProps {
  description: string;
  complete: boolean;
  toggleTodoCompletion: (description: string) => void;
  deleteTodo: (description: string) => void;
}

@autobind
class EditTodoForm extends React.Component<EditTodoFormProps> {

  handleUpdate(event: React.FormEvent<HTMLInputElement>) {
    const { description, toggleTodoCompletion } = this.props;
    toggleTodoCompletion(description);
  }

  handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { description, deleteTodo } = this.props;
    deleteTodo(description);
  }

  render() {
    const { description, complete } = this.props;
    console.log("rendering the editTodo form...", this.props);

    return (
      <form name="edit-todo">
        <label htmlFor="edit-todo">{description}</label>

        <input
          type="checkbox"
          id="edit-todo"
          name="edit-todo"
          onChange={this.handleUpdate}
          checked={complete}
        />

        <button onClick={this.handleDelete}>Delete</button>
      </form>
    );
  }
}

export default EditTodoForm;
