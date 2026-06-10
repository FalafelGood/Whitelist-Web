import { Link } from 'react-router-dom'
import RatingBadge from './RatingBadge'

function VideoCard({ video }) {
  return (
    <div className="card border border-width-1 border-neutral-300 shadow-md w-full flex flex-col hover:brightness-80 hover:bg-neutral-200 px-4 py-2">
      <Link to={`/watch/?v=${video.yt_video_id}`}>
        <h2 className="card-title mx-2 my-2 line-clamp-2 min-h-[3.0rem]">{`${video.name}`}</h2>
        <img src={`https://i.ytimg.com/vi/${video.yt_video_id}/0.jpg`} width="800px" height="160px" className="rounded-xl mb-2"></img>
        <RatingBadge 
          osvRating={video.osv_rating}
          shortForm={true}
        />
      </Link>
    </div>
  )
}

export default VideoCard;