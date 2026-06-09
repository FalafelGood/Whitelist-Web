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
    <div className="card border border-width-1 border-neutral-300 shadow-md w-full flex flex-col hover:brightness-80 hover:bg-neutral-200 px-4 py-2">
      <Link to={`/watch/?v=${video.yt_video_id}`}>
        <h2 className="card-title mx-2 my-2 line-clamp-2 min-h-[3.0rem]">{`${video.name}`}</h2>
        <img src={`https://i.ytimg.com/vi/${video.yt_video_id}/0.jpg`} width="800px" height="160px" className="rounded-xl"></img>
        <div className={`badge ${ratingBadge} mt-2 text-md text-white`}>
          {ratingText}
        </div>
      </Link>
    </div>
  )
}

export default VideoCard;