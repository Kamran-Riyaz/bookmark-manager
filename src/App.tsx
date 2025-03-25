import React, { useState, useEffect } from "react";
import BookmarkForm from "./components/BookmarkForm";
import BookmarkList from "./components/BookmarkList";
import Filter from "./components/Filter";

// Removed local Bookmark interface and import it from a shared file
import { Bookmark } from "./types/Bookmark";

const App: React.FC = () => {
  // State for bookmarks, search, category, and dark mode
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Filter and sort bookmarks
  const filteredBookmarks = bookmarks
    .filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || b.category === category)
    ) // Ensure proper grouping of conditions
    .sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    ); // Sort by newest first

  return (
    <div
      className={`container mt-5 p-3 rounded ${
        darkMode ? "bg-dark text-white" : "bg-light text-dark"
      }`}
    >
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Bookmark Manager</h1>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Bookmark Form */}
      <BookmarkForm setBookmarks={setBookmarks} />

      {/* Filter Section */}
      <Filter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      {/* Bookmark List */}
      <BookmarkList bookmarks={filteredBookmarks} setBookmarks={setBookmarks} />
    </div>
  );
};

export default App;
