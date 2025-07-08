function VideoPlayer({ videoId, width=640, height=390}) {

  return (
    <iframe
      // Use CSS styling to size iframe... This is admittedly a bit janky, but I couldn't get tailwind to do what I wanted.
      style={{width: "80vw", height: "80vh"}}
      id="player" 
      type="text/html" 
      // width={`${width}`} 
      // height={`${height}`}
      src={`https://www.youtube.com/embed/${videoId}`}
      className="rounded-3xl shadow-xl mt-4 ml-4 mr-4 mb-2"
      ></iframe>
  );
}

export default VideoPlayer;