import {
  FaHome,
  FaFire,
  FaMusic,
  FaGamepad,
  FaFilm,
  FaNewspaper,
  FaBars
} from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ onCategory }) {
  const [active, setActive] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: "home", label: "Home", icon: <FaHome />, query: "react tutorials" },
    { id: "trending", label: "Trending", icon: <FaFire />, query: "trending videos" },
    { id: "music", label: "Music", icon: <FaMusic />, query: "music" },
    { id: "gaming", label: "Gaming", icon: <FaGamepad />, query: "gaming" },
    { id: "movies", label: "Movies", icon: <FaFilm />, query: "movies trailer" },
    { id: "news", label: "News", icon: <FaNewspaper />, query: "latest news" }
  ];

  const handleClick = (item) => {
    setActive(item.id);

    // 👇 IMPORTANT: category search trigger
    if (onCategory) {
      onCategory(item.query);
    }

    // always go to home page
    navigate("/");
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* Collapse Button */}
      <div
        className="sidebar-item"
        onClick={() => setCollapsed(!collapsed)}
        style={{ justifyContent: collapsed ? "center" : "flex-start" }}
      >
        <FaBars />
        {!collapsed && <span>Menu</span>}
      </div>

      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`sidebar-item ${active === item.id ? "active" : ""}`}
          onClick={() => handleClick(item)}
        >
          {item.icon}
          {!collapsed && <span>{item.label}</span>}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;