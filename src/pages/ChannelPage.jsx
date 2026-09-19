import VideoCard from '../components/VideoCard'
import Loading from './Loading';
import ChannelStats from '../components/ChannelStats';
import AdminChannel from '../components/AdminChannel';
import SubscribeButton from '../components/SubscribeButton';
import { Link, useSearchParams } from 'react-router-dom'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/react'

function ChannelPage() {

  const limit = 12; // Number of videos per page
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get('cid');
  const { isSignedIn } = useAuth();

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

  const {
    data: stats,
    isPending: isStatsPending,
    isError: isStatsError
  } = useQuery({
    queryKey: ['channelStats', channelId],
    queryFn: async () => {
      const res = await fetch(`/api/channel_stats?cid=${channelId}`)
      if (!res.ok) {
        throw new Error(`HTTP code ${res.status}`);
      }
      return res.json();
    },
    enabled: !!channelId
  });

  if (isPending || isStatsPending) {
    return (
      <>
        <Loading/>
      </>
    )
  }

  if (isError || isStatsError) {
    return <h1>Something went wrong!</h1>
  }

  // Flatten data
  const pages = data?.pages ?? [];
  const name = pages[0]?.name ?? '';
  const videos = pages.flatMap(page => page.videos ?? []);

  return (
    <>
      <div className="flex flex-col mt-8 ml-8 gap-4">
        <h1 className="card-title text-4xl">{name}</h1>

        <div className="flex flex-row gap-4">
          <SubscribeButton />
          <Link to="/" className="btn btn-primary btn-outline btn-lg w-32">
            Back
          </Link>
        </div>
      </div>
      

      <ChannelStats 
        ratingStats = {stats.ratingStats}
        videoStats = {stats.videoStats}
      />
      {isSignedIn && <AdminChannel name={name} channelId={channelId} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-8 place-items-center px-4 pb-4 mt-8">
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