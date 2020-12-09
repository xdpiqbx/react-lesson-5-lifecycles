import React from 'react';
import './TodoFilter.scss';

const TodoFilter = ({ value, onChangeFilter }) => {
  return (
    <label>
      <span>Filter by name</span>
      <input type="text" value={value} onChange={onChangeFilter} />
    </label>
  );
};

export default TodoFilter;
