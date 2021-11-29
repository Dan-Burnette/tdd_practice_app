import React, { useState } from "react";
import { Todo } from "./interfaces";

interface FilterProps {
  params: Todo;
  filter: (params: Todo) => void;
}

function Filters(props: FilterProps) {
  const { params, filter } = props;
  // const [inputValue, setInputValue] = useState("");

  // Just track description + complete in local state (the filter state).
  // Then we simply call the filter function with the local state
  // const handleFilterChange = (e) => {
  //   const params = {
  //     description: "",
  //     complete: false,
  //   };
  //
  //   props.filter(params);
  // };

  const handleDescriptionFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newParams = {
      description: event.target.value,
      complete: params.complete,
    };
    filter(newParams);
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
    </div>
  );
}

export default Filters;
