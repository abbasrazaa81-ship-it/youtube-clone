import { useParams } from "react-router-dom";

function VideoPlayer() {
  const { id } = useParams();

  return (
    <div className="video-player">
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${id}`}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoPlayer;