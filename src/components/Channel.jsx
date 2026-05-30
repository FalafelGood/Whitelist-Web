import VideoCard from '../components/VideoCard'
import {Link} from 'react-router-dom'

// N.B. "className" is an optional prop is used in SearchPage.jsx to squeeze the channel component into 
// the search results a little bit more nicely.
function Channel({ channel, className = 'sm:max-w-[500px] md:max-w-[1200px]' }) {

  return (
    <div className={`card border border-width-1 border-neutral-300 shadow-xl w-full flex flex-col ${className}`}>
      <h1 className="card-title text-4xl mx-2 mt-2 mb-1 line-clamp-2">{`${channel.name}`}</h1>
      <img className="rounded-xl mx-2 mb-2 w-[calc(100%-1rem)] h-auto"
        src={`${channel.banner_url}`}
        referrerPolicy="no-referrer"></img>
      <div className="flex m-2 flex-1 items-center">
        <img src={`${channel.pfp_url}`}
        className="rounded-full w-[75px] h-[75px] shrink-0 object-cover m-2"
        referrerPolicy="no-referrer"
        />
        <div className="flex items-center min-w-0 flex-1 h-[7.5rem]">
          <p className="ml-2 mr-2 line-clamp-5">
            {channel.description == "" ? `This channel has no description... How mysterious of them!`: `${channel.description}`}
          </p>
        </div>
      </div>
      <Link to={`/channel?cid=${channel.yt_channel_id}`}
      state={channel}
      className="btn btn-primary ml-4 mr-4 mb-6 mt-auto">
      Visit Channel
      </Link>
      {/* <div className="grid sm:grid-cols:1 md:grid-cols-2 place-items-center">
        <VideoCard video={channel.videos[0]}/>
        <VideoCard video={channel.videos[1]}/>
      </div> */}
    </div>
  );
}

export default Channel;