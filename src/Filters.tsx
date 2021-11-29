import React, { useState } from "react";
import { Todo } from "./interfaces";

interface FilterProps {
  params: Todo;
  setFilterParams: (params: Todo) => void;
}

function Filters(props: FilterProps) {
  const { params, setFilterParams } = props;

  const handleDescriptionFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newParams = Object.assign({}, params);
    newParams.description = event.target.value;
    setFilterParams(newParams);
  };

  const handleCompletionFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newParams = Object.assign({}, params);
    newParams.complete = event.target.checked;
    setFilterParams(newParams);
  };

  return (
    <div>
      <label htmlFor="todo-description-filter">Filter by description</label>
      <input
        type="text"
        id="todo-description-filter"
        name="todo-description-filter"
        value={params.description}
        onChange={handleDescriptionFilterChange}
      />

      <label htmlFor="todo-completion-filter">Filter by completion</label>
      <input
        type="checkbox"
        id="todo-completion-filter"
        name="todo-completion-filter"
        checked={params.complete}
        onChange={handleCompletionFilterChange}
      />
    </div>
  );
}

export default Filters;
