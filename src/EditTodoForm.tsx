import React from "react";
import { Todo } from "./interfaces";

interface EditTodoFormProps {
  todo: Todo;
  toggleTodoCompletion: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

function EditTodoForm(props: EditTodoFormProps) {
  const { todo, toggleTodoCompletion, deleteTodo } = props;

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteTodo(todo);
  };

  return (
    <form name="edit-todo">
      <label htmlFor="edit-todo">{todo.description}</label>

      <input
        type="checkbox"
        id="edit-todo"
        name="edit-todo"
        onChange={(e) => toggleTodoCompletion(todo)}
        checked={todo.complete}
      />

      <button onClick={handleDelete}>Delete</button>
    </form>
  );
}

export default EditTodoForm;
