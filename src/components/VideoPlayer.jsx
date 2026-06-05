function VideoPlayer({ videoId }) {
  return (
    <div className="w-full aspect-video">
      <iframe
        id="player"
        type="text/html"
        src={`https://www.youtube.com/embed/${videoId}`}
        className="w-full h-full rounded-3xl shadow-xl"
        title="YouTube video player"
      />
    </div>
  );
}

export default VideoPlayer;