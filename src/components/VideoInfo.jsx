// J.M.J.

import RatingBadge from "./RatingBadge"
import { Link } from "react-router-dom"

function VideoInfo({ videoData, channelData }) {
  return (
    <>

    <div className="card bg-base-300 shadow-md w-full">

      <div className="card-body min-w-0 justify-center py-4">
        <h2 className="card-title text-lg sm:text-xl line-clamp-2">
          {videoData.name}
        </h2>

        {/* Channel info */}
        <div className="card-actions my-2 w-full flex items-center justify-between">
          <Link 
            className="flex items-center gap-3 min-w-0"
            to={`/channel?cid=${channelData.yt_channel_id}`} 
          >
            <img
              src={`${channelData.pfp_url}`}
              className="rounded-full w-[55px] h-[55px] shrink-0"
              referrerPolicy="no-referrer"
              alt=""
            />
            <h3 className="truncate text-lg">{channelData.name}</h3>
          </Link>
        </div>
          
        <RatingBadge
        osvRating={videoData.osv_rating}
        />
      </div>

      <div className="card-body gap-0 sm:p-6 -mt-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
          <div className="card bg-base-200 shadow-sm border border-base-100 flex-1">
            <div className="card-body">
              <h2 className="card-title text-lg">Summary</h2>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {videoData.summary_text ? videoData.summary_text : 'No summary available.'}
              </p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-sm border border-base-100 flex-1">
            <div className="card-body">
              <h2 className="card-title text-lg">Review</h2>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {videoData.review_text ? videoData.review_text : 'No description available.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default VideoInfo
