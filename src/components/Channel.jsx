import VideoCard from '../components/VideoCard'
import {Link} from 'react-router-dom'

function Channel({ channel }) {

  return (
    <div className="card bg-base-500 m-4 shadow-lg sm:max-w[500px] md:max-w-[1200px]">
      <h1 className="card-title text-4xl m-2">{`${channel.name}`}</h1>
      <img className="rounded-xl m-2" src={`${channel.banner}`}></img>
      <div className="flex m-2">
        <img src={`${channel.photo}`}
        className="rounded-full max-w-[100px] max-h-[100px] m-2"
        />
        <div className="flex items-center">
          <p className="ml-2 mr-2 line-clamp-5">
            {`${channel.description}`}
          </p>
        </div>
      </div>
      <Link to="/channel?cid=@HarpaDeiMusic"
      state={channel}
      className="btn btn-primary ml-4 mr-4">
      Visit Channel
      </Link>
      <div className="grid sm:grid-cols:1 md:grid-cols-2 place-items-center">
        <VideoCard video={channel.videos[0]}/>
        <VideoCard video={channel.videos[1]}/>
      </div>
    </div>
  );
}

export default Channel;