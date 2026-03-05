import VideoCard from '../components/VideoCard'
import { Link, useSearchParams } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'

function ChannelPage() {

  const limit = 12; // Number of videos per page
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get('cid');

  if (!channelId) {
    return <h1>Uh-oh! This channel isn't available!</h1>
  }

  async function loadVideos({ pageParam = 1 }) {
    const res = await fetch(
      `/api/channel_videos?channel=${channelId}&limit=${limit}&page=${pageParam}`
    )
    if (!res.ok) {
      throw new Error(`HTTP code ${res.status}`);
    }
    return res.json();
  }

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({ 
    queryKey: ['channelVideos', channelId], 
    queryFn: loadVideos,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce(
        (sum, page) => sum + (page.videos?.length ?? 0),
        0
      );
      return totalLoaded < (lastPage.numVideos ?? 0)
        ? allPages.length + 1
        : undefined;
    },
    enabled: !!channelId
  });

  if (isPending) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>Something went wrong!</h1>
  }

  // Flatten data
  const pages = data?.pages ?? [];
  const name = pages[0]?.name ?? '';
  const videos = pages.flatMap(page => page.videos ?? []);

  return (
    <>
      <h1 className="card-title text-4xl ml-8 mt-8">Videos from {name}</h1>
      <div className="flex items-center justify-center">
        <Link to="/" className="btn btn-primary w-48 ml-8 mr-8 mt-6">
          Home
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center">
        {videos.map((video) => (
          <VideoCard key={video.yt_video_id} video={video} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button 
          className="btn btn-primary w-48 ml-4 mr-4 mb-8"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      </div>
    </>
  )
}

export default ChannelPage;