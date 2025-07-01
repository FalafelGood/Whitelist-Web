import VideoCard from '../components/VideoCard'
import {Link, useLocation} from 'react-router-dom'

function ChannelPage() {

  const location = useLocation();
  const channel = location.state;
  console.log(channel);

  return channel ? (
    <>
      <h1 className="card-title text-4xl ml-8 mt-8">Videos from {channel.name}</h1>
      <div className="grid sm:grid-cols:1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {channel.videos.map((video, idx) => (
          <VideoCard key={idx} video={video} />
        ))}
      </div>
    </>
  ) : (
    <h1>An error has occoured</h1>
  )

}

export default ChannelPage;