import React, { useState } from "react";
import { Todo } from "./interfaces";
import ErrorMessage from "./ErrorMessage";

interface NewTodoFormProps {
  todos: Todo[];
  createTodo: (description: string) => void;
}

function NewTodoForm(props: NewTodoFormProps) {
  const { todos, createTodo } = props;
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const errorPresent = errorMessage.length > 0;

  const todoExists = (description: string) => {
    const match = todos.find((t) => t.description === description);
    return match !== undefined;
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const alreadyExists = todoExists(inputValue);
    const isBlank = inputValue.length === 0;
    if (alreadyExists) {
      setErrorMessage("You've already added that todo to your list.");
    } else if (isBlank) {
      setErrorMessage("Oops! You can't add a blank todo!");
    } else {
      createTodo(inputValue);
      setInputValue("");
      setErrorMessage("");
    }
  };

  return (
    <form name="new-todo">
      <label htmlFor="new-todo">New Todo</label>
      <input
        type="text"
        id="new-todo"
        name="new-todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Create Todo
      </button>

      {errorPresent ? <ErrorMessage message={errorMessage} /> : null}
    </form>
  );
}

export default NewTodoForm;
