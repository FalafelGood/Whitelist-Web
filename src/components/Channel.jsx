import VideoCard from '../components/VideoCard'
import {Link} from 'react-router-dom'

// N.B. "className" is an optional prop is used in SearchPage.jsx to squeeze the channel component into 
// the search results a little bit more nicely.
function Channel({ channel, className = 'm-4 sm:max-w-[500px] md:max-w-[1200px]' }) {

  return (
    <div className={`card card-border bg-base-400 shadow-lg w-full ${className}`}>
      <h1 className="card-title text-4xl m-2">{`${channel.name}`}</h1>
      <img className="rounded-xl m-2" 
        src={`${channel.banner_url}`}
        referrerPolicy="no-referrer"></img>
      <div className="flex m-2">
        <img src={`${channel.pfp_url}`}
        className="rounded-full max-w-[100px] max-h-[100px] m-2"
        referrerPolicy="no-referrer"
        />
        <div className="flex items-center">
          <p className="ml-2 mr-2 line-clamp-5">
            {`${channel.description}`}
          </p>
        </div>
      </div>
      <Link to={`/channel?cid=${channel.yt_channel_id}`}
      state={channel}
      className="btn btn-primary ml-4 mr-4 mb-6">
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