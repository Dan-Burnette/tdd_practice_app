import React from 'react';

interface TodoFormProps {
  createTodo: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function TodoForm(props: TodoFormProps) {
  const { createTodo } = props;

  return (
    <form name="todo-form">
      <label htmlFor="new-todo">New Todo</label>
      <input type="text" id="new-todo" name="new-todo" />
      <button type="submit" onClick={createTodo}>Create</button>
    </form>
  );
}

export default TodoForm;
