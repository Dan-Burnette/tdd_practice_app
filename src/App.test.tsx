import React from "react";
import { render, screen, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("element rendering", () => {
  it("renders the application header", () => {
    const props = { todos: [] };
    render(<App {...props} />);

    const headerElement = screen.getByText("Todo Application");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the todo form", () => {
    const props = { todos: [] };
    render(<App {...props} />);

    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
  });

  it("renders the todos", () => {
    const todos = [
      { description: "do that thing", complete: false },
      { description: "do that other thing", complete: false },
    ];
    const props = { todos: todos };

    render(<App {...props} />);

    todos.forEach((todo) => {
      const todoElement = screen.getByText(todo.description);
      expect(todoElement).toBeInTheDocument();
    });
  });
});

it("creates a todo properly", () => {
  const props = { todos: [] };
  render(<App {...props} />);

  const todoInputElement = screen.getByRole("textbox");
  userEvent.type(todoInputElement, "do something");

  const createTodoButtonElement = screen.getByText("Create Todo");
  userEvent.click(createTodoButtonElement);

  const todoElement = screen.getByRole("listitem");
  expect(todoElement.innerHTML).toMatch(/do something/);
});

it("deletes a todo properly", () => {
  const todos = [
    { description: "first todo", complete: false },
    { description: "second todo", complete: false },
    { description: "third todo", complete: false },
  ];
  const props = { todos: todos };
  render(<App {...props} />);

  const secondTodoElement = screen.getByText("second todo");
  const secondTodoDeleteButtonElement = getByText(secondTodoElement, "Delete");
  userEvent.click(secondTodoDeleteButtonElement);

  const todoListElement = screen.getByRole("list");
  const listContent = todoListElement.innerHTML;
  expect(listContent).toMatch(/first todo/);
  expect(listContent).not.toMatch(/second todo/);
  expect(listContent).toMatch(/third todo/);
});
