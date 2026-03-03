import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import { useState, useEffect, useCallback } from "react";
import { fetchVideos } from "./api";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🌙 Save dark mode in localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // 🎥 Video loader (optimized)
  const loadVideos = useCallback(async (query) => {
    try {
      setLoading(true);

      const data = await fetchVideos(query);

      setVideos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("API Error:", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🚀 Default load only once
  useEffect(() => {
    loadVideos("react tutorials");
  }, [loadVideos]);

  return (
    <Router>
      <div className={darkMode ? "app dark" : "app"}>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onSearch={loadVideos}
          onCategory={loadVideos}
        />

        <div className="main-layout">
          <Sidebar onCategory={loadVideos} />

          <Routes>
            <Route
              path="/"
              element={
                <Home
                  videos={videos}
                  loading={loading}
                />
              }
            />
            <Route path="/video/:id" element={<VideoPlayer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;