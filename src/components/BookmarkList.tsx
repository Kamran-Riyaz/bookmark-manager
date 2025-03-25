import React, { useState } from "react";
import { FaTrash, FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { Bookmark } from "../types/Bookmark"; // Import shared Bookmark type

interface BookmarkListProps {
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
}

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, setBookmarks }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const handleDelete = (index: number) => {
    setBookmarks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditTitle(bookmarks[index].title);
    setEditUrl(bookmarks[index].url);
    setEditCategory(bookmarks[index].category);
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      setBookmarks((prev) =>
        prev.map((bookmark, index) =>
          index === editingIndex
            ? { ...bookmark, title: editTitle, url: editUrl, category: editCategory }
            : bookmark
        )
      );
      setEditingIndex(null);
    }
  };

  return (
    <ul className="list-group">
      {bookmarks.map((bookmark, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          {editingIndex === index ? (
            <div className="w-100">
              <input
                className="form-control mb-1"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                className="form-control mb-1"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
              />
              <select
                className="form-control mb-1"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                <option value="General">General</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
              </select>
              <button className="btn btn-success btn-sm me-2" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setEditingIndex(null)}>
                Cancel
              </button>
            </div>
          ) : (
            <>
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="me-2">
                {bookmark.title} <FaExternalLinkAlt />
              </a>
              <span className="badge bg-secondary">{bookmark.category}</span>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(index)}>
                <FaEdit />
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>
                <FaTrash />
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BookmarkList;
