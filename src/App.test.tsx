import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the application header', () => {
  const props = { todos: [] }
  render(<App {...props}/>);

  const headerElement = screen.getByText('Todo Application');
  expect(headerElement).toBeInTheDocument();
});

test('renders the todo form', () => {
  const props = { todos: [] }
  render(<App {...props} />);

  const formElement = screen.getByRole('form');
  expect(formElement).toBeInTheDocument();
});

describe('when todos are present', () => {

  it('renders the todos properly', () => {
    const props = { todos: ["do that thing", "do that other thing"] }
    render(<App {...props} />);

    todos.forEach(todo => {
      const todoElement = screen.getByText(todo);
      expect(todoElement).toBeInTheDocument();
    });
  });

});



