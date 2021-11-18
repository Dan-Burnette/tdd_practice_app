import React from 'react';

function TodoForm() {
  return (
    <form name="todo-form">
      <label htmlFor="new-todo">New Todo</label>
      <input type="text" id="new-todo" name="new-todo" />
      <button type="submit">Create</button>
    </form>
  );
}

export default TodoForm;
