import { useNavigate } from "react-router-dom";

function Home({ videos = [], loading }) {
  const navigate = useNavigate();

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading videos...</h2>;
  }

  if (!videos.length) {
    return <h2 style={{ padding: "20px" }}>No videos found 😢</h2>;
  }

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <div
          key={video.id}
          className="video-card"
          onClick={() => navigate(`/video/${video.id}`)}
        >
          <img src={video.thumbnail} alt={video.title} />

          <div className="video-info">
            <h4>{video.title}</h4>
            <p>{video.channel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;