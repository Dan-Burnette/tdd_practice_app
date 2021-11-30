import React from "react";
import { render, screen, getByText, getByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("element rendering", () => {
  it("renders the application header", () => {
    const props = { todos: [] };
    render(<App {...props} />);

    const headerElement = screen.getByText("My Todos");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the new todo form", () => {
    const props = { todos: [] };
    render(<App {...props} />);

    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
  });

  it("renders existing todos", () => {
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

  const todoInputElement = screen.getByRole("textbox", { name: "New Todo" });
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

  const secondTodoElement = screen
    .getByText("second todo")
    .closest("form") as HTMLFormElement;
  const secondTodoDeleteButtonElement = getByText(secondTodoElement, "Delete");
  userEvent.click(secondTodoDeleteButtonElement);

  const todoListElement = screen.getByRole("list");
  const listContent = todoListElement.innerHTML;
  expect(listContent).toMatch(/first todo/);
  expect(listContent).not.toMatch(/second todo/);
  expect(listContent).toMatch(/third todo/);
});

it("updates a todo's completion properly", () => {
  const todos = [{ description: "do something", complete: false }];
  const props = { todos: todos };
  render(<App {...props} />);

  const editTodoFormElement = screen
    .getByText("do something")
    .closest("form") as HTMLFormElement;
  const checkboxElement = getByRole(editTodoFormElement, "checkbox");

  userEvent.click(checkboxElement);
  expect(checkboxElement).toBeChecked();
  userEvent.click(checkboxElement);
  expect(checkboxElement).not.toBeChecked();
});

describe("todo filtering", () => {
  it("filters by description properly", () => {
    const matchingTodos = [
      { description: "something", complete: false },
      { description: "something else", complete: false },
    ];
    const nonMatchingTodos = [
      { description: "do that thing", complete: false },
      { description: "do that other thing", complete: false },
    ];
    const todos = [...matchingTodos, ...nonMatchingTodos];
    const props = { todos: todos };
    render(<App {...props} />);

    const filterInputElement = screen.getByRole("textbox", {
      name: "Filter by description",
    });
    userEvent.type(filterInputElement, "something");

    matchingTodos.forEach((todo) => {
      const todoElement = screen.getByText(todo.description);
      expect(todoElement).toBeInTheDocument();
    });
    nonMatchingTodos.forEach((todo) => {
      const todoElement = screen.queryByText(todo.description);
      expect(todoElement).not.toBeInTheDocument();
    });
  });

  describe("completion filter", () => {
    it("shows all todos when 'All' is selected", () => {
      const todos = [
        { description: "something", complete: true },
        { description: "something else", complete: true },
      ];
      const props = { todos: todos };
      render(<App {...props} />);

      const selectElement = screen.getByRole("combobox");
      userEvent.selectOptions(selectElement, "all");

      todos.forEach((todo) => {
        const todoElement = screen.getByText(todo.description);
        expect(todoElement).toBeInTheDocument();
      });
    });

    it("shows only uncompleted todos when 'In Progress' is selected", () => {
      const completedTodos = [
        { description: "something", complete: true },
        { description: "something else", complete: true },
      ];
      const uncompletedTodos = [
        { description: "do that thing", complete: false },
        { description: "do that other thing", complete: false },
      ];
      const todos = [...completedTodos, ...uncompletedTodos];
      const props = { todos: todos };
      render(<App {...props} />);

      const selectElement = screen.getByRole("combobox");
      userEvent.selectOptions(selectElement, "in-progress");

      uncompletedTodos.forEach((todo) => {
        const todoElement = screen.getByText(todo.description);
        expect(todoElement).toBeInTheDocument();
      });

      completedTodos.forEach((todo) => {
        const todoElement = screen.queryByText(todo.description);
        expect(todoElement).not.toBeInTheDocument();
      });
    });

    it("shows only completed todos when 'Done' is selected", () => {
      const completedTodos = [
        { description: "something", complete: true },
        { description: "something else", complete: true },
      ];
      const uncompletedTodos = [
        { description: "do that thing", complete: false },
        { description: "do that other thing", complete: false },
      ];
      const todos = [...completedTodos, ...uncompletedTodos];
      const props = { todos: todos };
      render(<App {...props} />);

      const selectElement = screen.getByRole("combobox");
      userEvent.selectOptions(selectElement, "done");

      completedTodos.forEach((todo) => {
        const todoElement = screen.getByText(todo.description);
        expect(todoElement).toBeInTheDocument();
      });

      uncompletedTodos.forEach((todo) => {
        const todoElement = screen.queryByText(todo.description);
        expect(todoElement).not.toBeInTheDocument();
      });
    });
  });

  it("combines description AND completion filters properly", () => {
    const matchingTodos = [
      { description: "something big", complete: true },
      { description: "something fun", complete: true },
    ];
    const nonMatchingTodos = [
      { description: "something neato", complete: false },
      { description: "something cool", complete: false },
    ];

    const todos = [...matchingTodos, ...nonMatchingTodos];
    const props = { todos: todos };
    render(<App {...props} />);

    const filterInputElement = screen.getByRole("textbox", {
      name: "Filter by description",
    });
    const selectElement = screen.getByRole("combobox");
    userEvent.type(filterInputElement, "something");
    userEvent.selectOptions(selectElement, "done");

    matchingTodos.forEach((todo) => {
      const todoElement = screen.getByText(todo.description);
      expect(todoElement).toBeInTheDocument();
    });

    nonMatchingTodos.forEach((todo) => {
      const todoElement = screen.queryByText(todo.description);
      expect(todoElement).not.toBeInTheDocument();
    });
  });
});
