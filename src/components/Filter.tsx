import React from "react";

interface FilterProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Filter: React.FC<FilterProps> = ({ search, setSearch, category, setCategory }) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select className="form-control w-50" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option>General</option>
        <option>Work</option>
        <option>Personal</option>
        <option>Study</option>
      </select>
    </div>
  );
};

export default Filter;
