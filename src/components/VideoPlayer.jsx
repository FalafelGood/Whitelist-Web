function VideoPlayer({ videoId, width=640, height=390}) {

  return (
    <iframe 
      id="player" 
      type="text/html" 
      width={`${width}`} 
      height={`${height}`}
      src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com`}
      className="rounded-3xl shadow-xl"
      ></iframe>
  );
}

export default VideoPlayer;