function VideoPlayer({ videoId, width=640, height=390}) {

  return (
    <iframe 
      id="player" 
      type="text/html" 
      width="640" 
      height="390"
      src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com`}
      frameborder="0"
      className="rounded-3xl shadow-xl"
      ></iframe>
  );
}

export default VideoPlayer;