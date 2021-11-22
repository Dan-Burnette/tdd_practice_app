import React from "react";
import autobind from "autobind-decorator";
import {Todo} from './interfaces';

interface EditTodoFormProps {
  todo: Todo;
  updateTodo: (description: string) => void;
  deleteTodo: (description: string) => void;
} 

@autobind
class EditTodoForm extends React.Component<EditTodoFormProps> {

  constructor(props: EditTodoFormProps) {
    super(props);
    // console.log('edit form props', props);
  }

  handleUpdate(event: React.FormEvent<HTMLInputElement>){
    event.preventDefault();
    const {todo, updateTodo} = this.props;
    updateTodo(todo.description);
  }

  handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const {todo, deleteTodo} = this.props;
    deleteTodo(todo.description);
  }

  render() {
    const {todo} = this.props;

    return(
      <form name="edit-todo">
        <label htmlFor="edit-todo">{todo.description}</label>

        <input
          type="checkbox"
          id="edit-todo"
          name="edit-todo"
          onClick={this.handleUpdate}
        />

        <button onClick={this.handleDelete}>Delete</button>
    </form>)
  }
}

export default EditTodoForm;
