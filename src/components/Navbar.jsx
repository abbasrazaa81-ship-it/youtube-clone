import { FaYoutube, FaMoon, FaSun } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ darkMode, setDarkMode, onSearch, onCategory }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");
  const navigate = useNavigate();

  // 🔐 Auth listener (with cleanup)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log("Login Error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  // 🔍 Search Function
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
      setActiveCategory("");
      navigate("/");
    }
  };

  // ⌨️ Enter Key Support (modern way)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 📂 Category Click
  const handleCategory = (category) => {
    setActiveCategory(category);
    setSearchTerm("");
    onCategory(category);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* 🔴 Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        <FaYoutube className="yt-icon" />
        <span>YouTube Pro</span>
      </div>

      {/* 📂 Categories */}
      <div className="categories">
        {["music", "sports", "news"].map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? "active-category" : ""}
            onClick={() => handleCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* 🔍 Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>
          <FiSearch />
        </button>
      </div>

      {/* 👤 Right Section */}
      <div className="nav-right">
        {user ? (
          <>
            <img
              src={user.photoURL}
              alt="profile"
              className="profile-pic"
            />
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button className="login-btn" onClick={login}>
            Login
          </button>
        )}

        {/* 🌙 Dark Mode Toggle */}
        {darkMode ? (
          <FaSun
            className="dark-icon"
            onClick={() => setDarkMode(false)}
          />
        ) : (
          <FaMoon
            className="dark-icon"
            onClick={() => setDarkMode(true)}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
