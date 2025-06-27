import VideoPlayer from '../components/VideoPlayer'

function VideoPage() {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString)
  const videoId = urlParams.get('v');

  return (
    <div className="hero">
      <div className="hero-content flex-col">
        <h1 className="text-xl">Video Title</h1>
        <VideoPlayer videoId={`${videoId}`}/>
        <div className="btn btn-primary">Home</div>
      </div>
    </div>
  )
}

export default VideoPage;