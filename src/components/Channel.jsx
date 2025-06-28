import VideoCard from '../components/VideoCard'
import {Link} from 'react-router-dom'

function Channel({ channel }) {

  return (
    <div className="card bg-base-500 m-4 shadow-lg sm:max-w[500px] md:max-w-[800px]">
      <h1 className="card-title text-4xl m-2">{`${channel.name}`}</h1>
      <img className="rounded-xl m-2" src={`${channel.banner}`}></img>
      <div className="flex m-2">
        <img src={`${channel.photo}`}
        className="rounded-full max-w-[100px] max-h-[100px] m-2"
        />
        <p className="ml-2 mr-2">
          {`${channel.description}`}
        </p>
      </div>
      <Link to="/channel?cid=@HarpaDeiMusic" className="btn btn-primary ml-4 mr-4">
      Visit Channel
      </Link>
      <div className="grid sm:grid-cols:1 md:grid-cols-2 place-items-centHow They Fool Ya (live) | Math parody of Hallelujaher">
        <VideoCard video={channel.videos[0]}/>
        <VideoCard video={channel.videos[1]}/>
      </div>
    </div>
  );
}

export default Channel;