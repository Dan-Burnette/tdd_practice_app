import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoForm from './TodoForm';

test('renders the form', () => {
  render(<TodoForm />);

  const formElement = screen.getByRole('form');
  expect(formElement).toBeInTheDocument();
});

test('renders the new todo label', () => {
  render(<TodoForm />);

  const labelElement = screen.getByLabelText('New Todo');
  expect(labelElement).toBeInTheDocument();
});

test('renders the new todo input', () => {
  render(<TodoForm />);

  const inputElement = screen.getByRole('textbox')
  expect(inputElement).toBeInTheDocument();
});

test('renders the submit button', () => {
  render(<TodoForm />);

  const buttonElement = screen.getByRole('button')
  expect(buttonElement).toBeInTheDocument();
});
