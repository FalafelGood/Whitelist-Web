import VideoCard from '../components/VideoCard'
import { Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function ChannelPage() {

  // State
  const [videos, setVideos] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [numVideos, setNumVideos] = useState(0);

  // Constants
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get('cid');
  const limit = 12; // Number of videos per page
  const isLastPage = videos.length >= numVideos;

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    if (!channelId) {
      console.log("channelId not found!");
      setIsLoading(false);
      return;
    }
    fetch(`/api/channel_videos?channel=${channelId}&limit=${limit}`)
    .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP code ${res.status}`);
        }
        return res.json();
      })
    .catch(error => {
      console.error("Database error:", error);
      setError(true);
      setIsLoading(false);
      throw error; // chain will continue unless I throw here.
    })
    .then(data => {
      setName(data?.name ?? '');
      setVideos(data?.videos ?? []);
      setNumVideos(data?.numVideos ?? 0);
      setIsLoading(false);
    })
  }, [channelId]);

  function handleLoadMore() {
    fetch(`/api/channel_videos?channel=${channelId}&page=${page+1}`)
    .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP code ${res.status}`);
        }
        return res.json();
      })
    .catch(error => {
      console.error("Database error:", error);
      setError(true);
      setIsLoading(false);
      throw error; // chain will continue unless I throw here.
    })
    .then(data => {
      console.log("Setting new videos");
      setName(data?.name ?? '');
      setVideos(prev => [...prev, ...data.videos]);
      setIsLoading(false);
      setPage(page+1);
    })
  }

  // Error case -- we failed to load from the backend.
  if (error) {
    return <h1>Something went wrong! Try reloading the page</h1>
  }

  // Base case -- we're either still loading or we're ready to show the view
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <h1 className="card-title text-4xl ml-8 mt-8">Videos from {name}</h1>
      <div className="flex items-center justify-center">
        <Link to="/" className="btn btn-primary w-48 ml-8 mr-8 mt-6">
          Home
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center">
        {videos.map((video, idx) => (
          <VideoCard key={idx} video={video} />
        ))}
      </div>
      <div class="flex items-center justify-center">
        <button className="btn btn-primary w-48 ml-4 mr-4 mb-8" onClick={handleLoadMore} disabled={isLastPage}>Load more</button>
      </div>
    </>
  )
}

export default ChannelPage;