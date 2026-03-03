import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

  return (
    <div
      className="video-card"
      onClick={() => navigate(`/video/${video.id.videoId}`)}
    >
      <img src={video.snippet.thumbnails.medium.url} alt="" />
      <div className="video-info">
        <h4>{video.snippet.title}</h4>
        <p>{video.snippet.channelTitle}</p>
      </div>
    </div>
  );
}

export default VideoCard;