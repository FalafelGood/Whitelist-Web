import VideoPlayer from '../components/VideoPlayer'
import {Link} from 'react-router-dom'

function VideoCard({ video }) {
  return (
    <div className="card bg-base-300 shadow-md p-4 m-8 hover:brightness-90 max-w-[425px]">
      <Link to={`/watch/?v=${video.id}`}>
        <h2 className="card-title mb-2">{`${video.name}`}</h2>
        <p className="mb-2">Channel name</p>
        <img src={`https://i.ytimg.com/vi/${video.id}/0.jpg`} width="400px" height="160px" className="rounded-xl"></img>
      </Link>
    </div>
  )
}

export default VideoCard;