import React from "react";

interface FilterProps {
  descriptionFilter: string;
  setDescriptionFilter: (description: string) => void;
  completionFilter: string;
  setCompletionFilter: (description: string) => void;
}

function Filters(props: FilterProps) {
  const {
    descriptionFilter,
    setDescriptionFilter,
    completionFilter,
    setCompletionFilter,
  } = props;

  return (
    <div>
      <label htmlFor="todo-description-filter">Filter by description</label>
      <input
        type="text"
        id="todo-description-filter"
        name="todo-description-filter"
        value={descriptionFilter}
        onChange={(e) => setDescriptionFilter(e.target.value)}
      />

      <label htmlFor="todo-completion-filter">Filter by completion</label>
      <select
        name="todo-completion-filter"
        id="todo-completion-filter"
        onChange={(e) => setCompletionFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}

export default Filters;
