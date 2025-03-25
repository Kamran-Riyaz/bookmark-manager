import React, { useState } from "react";

interface BookmarkFormProps {
  setBookmarks: React.Dispatch<React.SetStateAction<{ title: string; url: string; category: string }[]>>;
}

const BookmarkForm: React.FC<BookmarkFormProps> = ({ setBookmarks }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("General");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookmarks((prev) => [
      { title, url, category, dateAdded: new Date().toISOString() },
      ...prev, // Newest bookmarks appear first
    ]);
  };
  

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input type="text" className="form-control" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="mb-2">
        <input type="url" className="form-control" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
      </div>
      <div className="mb-2 w-50">
        <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>General</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Study</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary w-40 mt-2">Add Bookmark</button>
    </form>
  );
};

export default BookmarkForm;
