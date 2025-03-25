import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Bookmark, ISODateString } from "../types/Bookmark"; // Import shared types

interface BookmarkFormProps {
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
}

const BookmarkForm: React.FC<BookmarkFormProps> = ({ setBookmarks }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("General");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBookmark: Bookmark = {
      id: uuidv4(),
      title,
      url,
      category,
      dateAdded: new Date().toISOString() as ISODateString, // Ensure ISODateString
    };

    setBookmarks((prev) => [newBookmark, ...prev]);
    setTitle("");
    setUrl("");
    setCategory("General");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="url"
          className="form-control"
          placeholder="URL"
          value={url}
          onChange={handleUrlChange}
          required
        />
      </div>
      <div className="mb-2 w-50">
        <select
          className="form-control"
          value={category}
          onChange={handleCategoryChange}
        >
          <option>General</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Study</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary w-40 mt-2">
        Add Bookmark
      </button>
    </form>
  );
};

export default BookmarkForm;
