export interface Todo {
  description: string;
  complete: boolean;
}

export interface TodoList {
  todos: Todo[];
}
