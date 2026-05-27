import { Link } from 'react-router-dom'

const RATING_BADGE_CLASS = {
  'A-I': 'bg-green-600',
  'A-II': 'bg-blue-600',
  'A-III': 'bg-orange-500',
  L: 'bg-red-600',
  O: 'bg-black',
}

function VideoCard({ video }) {
  const ratingBadge =
    RATING_BADGE_CLASS[video.osv_rating] ?? 'badge-neutral'

  const ratingText = video.osv_rating ?? 'Unrated'

  return (
    <div className="card bg-base-300 shadow-md p-4 m-8 hover:brightness-90 max-w-[1000px]">
      <Link to={`/watch/?v=${video.yt_video_id}`}>
        <h2 className="card-title line-clamp-3 h-[90px]">{`${video.name}`}</h2>
        {/* <p className="mb-2">Channel name</p> */}
        <img src={`https://i.ytimg.com/vi/${video.yt_video_id}/0.jpg`} width="800px" height="160px" className="rounded-xl"></img>
        <div className={`badge ${ratingBadge} mt-2 text-md text-white`}>
          {ratingText}
        </div>
      </Link>
    </div>
  )
}

export default VideoCard;