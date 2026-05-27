import { Link } from 'react-router-dom'

const RATING_BADGE_CLASS = {
  'A-I': 'bg-green-600',
  'A-II': 'bg-blue-600',
  'A-III': 'bg-orange-500',
  L: 'bg-red-600',
  O: 'bg-black',
}

// Note, searchedVideo contains additional metadata from the channels table
// See api/search.js
function VideoCardLong({ searchedVideo }) {
  const ratingBadge =
    RATING_BADGE_CLASS[searchedVideo.osv_rating] ?? 'badge-neutral'

  const thumbnail = `https://i.ytimg.com/vi/${searchedVideo.yt_video_id}/0.jpg`;

  return (
    <Link
      to={`/watch/?v=${searchedVideo.yt_video_id}`}
      className="card card-side bg-base-300 shadow-md w-full max-w-4xl mx-auto my-3 hover:brightness-90 transition-[filter]"
    >
      <figure className="shrink-0 w-40 sm:w-52 md:w-64">
        <img
          src={thumbnail}
          alt=""
          className="aspect-video w-full object-cover"
        />
      </figure>
      <div className="card-body min-w-0 justify-center py-4">
        <h2 className="card-title text-lg sm:text-xl line-clamp-2">
          {searchedVideo.name}
        </h2>
        <div className="card-actions mt-2 w-full flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={`${searchedVideo.channel_pfp_url}`}
              className="rounded-full w-[50px] h-[50px] shrink-0"
              referrerPolicy="no-referrer"
              alt=""
            />
            <h3 className="truncate">{searchedVideo.channel_name}</h3>
          </div>
          <span className={`badge ${ratingBadge} text-md text-white shrink-0`}>
            {searchedVideo.osv_rating}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default VideoCardLong;