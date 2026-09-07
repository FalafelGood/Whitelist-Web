// J.M.J.
import PieChart from "./PieChart";
import RatingBadge from "./RatingBadge";
import DropBox from "./DropBox";
import { FiInfo } from "react-icons/fi";

function ChannelStats({ ratingStats, videoStats }) {

  return(
    <div className="card border border-width-4 border-neutral-300 max-w-100 md:max-w-200 mx-auto mt-10">
      <div className="card-body">
        <h2 className="card-title">Channel Stats</h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">

          {/* Left hand stats */}
          <span className="flex flex-row gap-2">
            <span className="flex flex-col gap-2 items-end">
              <p className="text-xl">
                <b>{videoStats.video_review_count}</b>
              </p>
              {/* <p className="text-xl">
                <b>{videoStats.videos_exposed_count- videoStats.video_review_count}</b>
              </p> */}
              <p className="text-xl">
                <b>{videoStats.video_count}</b>
              </p>
            </span>

            <span className="flex flex-col gap-2 items-start">
              <p className="text-xl">
                Videos Reviewed
              </p>
              {/* <span className="flex flex-row gap-2 items-center">
                <p className="text-xl">
                  Found Inaccessible
                </p>
                <span className="tooltip" data-tip="i.e. videos without transcripts or hidden behind paywalls.">
                  <FiInfo className="w-4 h-4 text-neutral-600 cursor-help" tabIndex={0} />
                </span>
              </span> */}
              <p className="text-xl">
                Videos Total
              </p>
            </span>
          </span>

          {/* OSV Stats */}
          <span className="flex flex-row gap-2">
            <span className="flex flex-col gap-2 items-end">
              <RatingBadge osvRating='A-I'/>
              <RatingBadge osvRating='A-II'/>
              <RatingBadge osvRating='A-III' />
              <RatingBadge osvRating='L' />
              <RatingBadge osvRating='O' />
            </span>
            
            <span className="flex flex-col gap-3 items-end">
              <h3>{ratingStats['A-I']}</h3>
              <h3>{ratingStats['A-II']}</h3>
              <h3>{ratingStats['A-III']}</h3>
              <h3>{ratingStats['L']}</h3>
              <h3>{ratingStats['O']}</h3>
            </span>
          </span>

          <PieChart videoRatingCounts={ratingStats} />
        </div>
        {ratingStats['O'] > 0 &&
          <div className="mt-4 flex flex-col gap-4 items-center">
            <p>
              <i>
                Note: Videos with a "Morally Offensive" Rating are never platformed on the Whitelist!
              </i>
            </p>
            <DropBox 
              title='Why does this channel have "morally offensive" videos?' 
              body='Better safe than sorry! The LLM used to rate videos is instructed to be strict. This minimizes the odds of letting bad content through, but it can sometimes go a little overboard!
              '
            />
          </div>
        }
      </div>
    </div>
  )
}

export default ChannelStats;