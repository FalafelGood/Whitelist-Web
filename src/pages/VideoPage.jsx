import VideoPlayer from '../components/VideoPlayer'
import {Link} from 'react-router-dom'

function VideoPage() {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString)
  const videoId = urlParams.get('v');

  return (
    <div className="hero">
      <div className="hero-content flex-col">
        {/* <h1 className="text-xl">Video Title</h1> */}
        <VideoPlayer videoId={`${videoId}`}/>
        <div className="flex gap-4">
          <Link to="/" className="btn btn-primary">Home</Link>
          {/* <Link to="/channel?cid=@HarpaDeiMusic" className="btn btn-primary">Visit channel</Link> */}
        </div>
      </div>
    </div>
  )
}

export default VideoPage;