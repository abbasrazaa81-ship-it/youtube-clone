import axios from "axios";

// 🔐 IMPORTANT: .env file me API key rakho
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchVideos = async (query = "react tutorials") => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: "snippet",
        maxResults: 12,
        q: query,
        key: API_KEY,
        type: "video",              // 👈 VERY IMPORTANT
        safeSearch: "strict"
      }
    });

    // 👇 Proper formatted return
    return response.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channel: item.snippet.channelTitle
    }));

  } catch (error) {
    console.log("YouTube API Error:", error.response?.data || error.message);
    return [];
  }
};