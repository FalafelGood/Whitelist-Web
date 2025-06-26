import VideoPlayer from '../components/VideoPlayer'
import {Link} from 'react-router-dom'

function VideoCard({ videoId }) {
  return (
    <div className="card bg-base-300 w-100 shadow-md p-4 m-8 hover:brightness-90">
      <Link to={`/${videoId}`}>
        <h2 class="card-title mb-2">YouTube Video</h2>
        <p class="mb-2">Channel name</p>
        <img src={`https://i.ytimg.com/vi/${videoId}/0.jpg`} width="400px" height="160px" className="rounded-xl"></img>
      </Link>
    </div>
  )
}

export default VideoCard;