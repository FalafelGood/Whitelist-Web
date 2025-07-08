function VideoPlayer({ videoId, width=640, height=390}) {

  return (
    <iframe 
      id="player" 
      type="text/html" 
      width={`${width}`} 
      height={`${height}`}
      src={`https://www.youtube.com/embed/${videoId}`}
      className="rounded-3xl shadow-xl"
      ></iframe>
  );
}

export default VideoPlayer;