import VideoCard from '../components/VideoCard'
import { Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function ChannelPage() {

  const [searchParams] = useSearchParams();
  const channelId = searchParams.get('cid');

  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!channelId) {
      setIsLoading(false);
      return;
    }

    fetch(`/api/channel_videos?channel=${channelId}`)
    .then(res => res.json())
    .then(data => {
      setVideos(data.videos);
      setIsLoading(false);
    })

  }, [channelId]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <h1 className="card-title text-4xl ml-8 mt-8">Videos from TODO</h1>
      <Link to="/" className="btn btn-primary ml-8 mr-8 mt-6">
        Home
      </Link>
      <div className="grid grid-cols:1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center">
        {videos.map((video, idx) => (
          <VideoCard key={idx} video={video} />
        ))}
      </div>
    </>
  )
}

export default ChannelPage;