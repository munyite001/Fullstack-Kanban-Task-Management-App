/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function Sidebar(
  { theme, boards, setTheme, activeBoard, setActiveBoard, showSideBar, setShowSideBar, setShowCreateBoardModal }) {
  
  // Store sidebar visibility in localStorage to prevent it from being reset on re-renders
  useEffect(() => {
    const savedSidebarState = localStorage.getItem("showSideBar");
    if (savedSidebarState !== null) {
      setShowSideBar(JSON.parse(savedSidebarState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showSideBar", JSON.stringify(showSideBar));
  }, [showSideBar]);

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleCreateBoard = () => [

  ]

  return (
    <div
      className={
        theme === "dark"
          ? showSideBar
            ? "sidebar dark show-sidebar"
            : "sidebar dark"
          : showSideBar
          ? "sidebar show-sidebar"
          : "sidebar"
      }
    >
      <div className="sidebar-header">
        <div className="logo-container">
          <img src="/images/logo.png" alt="Kanban Logo" />
        </div>
        <h1>kanban</h1>
      </div>
      <h2 className={theme === "dark" ? "dark" : "light"}>
        All boards ({boards.length})
      </h2>
      <ul className="boards">
        {boards.map((board) => (
          <li
            key={board.id}
            className={board.id === activeBoard.id ? "active" : ""}
            onClick={() => setActiveBoard(board)}
          >
            <img
              src={theme === "dark" ? "/images/tasks.png" : "/images/tasks_blue.png"}
              alt="Board Icon"
            />
            <span>{board.name}</span>
          </li>
        ))}
        </ul>

      <div className={theme === "dark" ? "add-board dark" : "add-board light"}>
        <img src="/images/tasks_blue.png" alt="Add new Task logo" />
        <span onClick={handleCreateBoard}>Create New Board + </span>
      </div>
      <div className={theme === "dark" ? "toggle-theme dark" : "toggle-theme light"}>
        <img src="/images/sun.png" alt="Light Theme" />
        <input
          type="range"
          name="toggle-theme-button"
          id="toggle-theme-button"
          min={0}
          max={1}
          value={theme === "dark" ? 1 : 0}
          onChange={handleToggleTheme}
          className={theme === "dark" ? "dark" : "light"}
        />
        <img src="/images/moon.png" alt="Dark Theme" />
      </div>
      <div className={theme == "dark" ? "hide-sidebar dark" : "hide-sidebar light"} onClick={() => setShowSideBar(!showSideBar)}>
        <div className="img-container">
          <img src={showSideBar ? "/images/hidden.png" : "/images/eye.png"} alt="Toggle SideBar Visibility Icon" />
        </div>
        <span>Hide Sidebar</span>
      </div>
    </div>
  );
}
