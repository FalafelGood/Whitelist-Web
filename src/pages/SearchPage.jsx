import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Loading from './Loading';
import VideoCardLong from '../components/VideoCardLong';
import Channel from '../components/Channel';

// const [searchParams] = useSearchParams();
// const search_query = searchParams.get('search_query');

function SearchPage() {

  const [URLSearchParams] = useSearchParams();
  const searchQuery = URLSearchParams.get('search_query') ?? '';

  const { data, isPending, isError } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      const res = await fetch(`/api/search?search_query=${searchQuery}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json()
    },
    enabled: searchQuery.length > 0,
  })

  if (isPending) return <Loading />;
  if (isError) return <h1>Sometime went wrong!</h1>

  const videos = data?.rows ?? [];
  const channel = data?.channel ?? null;

  return (
    <>
      {/* <h1 className="card-title text-4xl ml-8 mt-8">Videos from {name}</h1> */}
      <div className="flex items-center justify-center">
        <Link to="/" className="btn btn-primary w-48 ml-8 mr-8 mt-6">
          Home
        </Link>
      </div>
      {/* 
        Note the className prop in the Channel component.
        This is to make the channel fit nicely with the videos!
      */}
      <div className="grid grid-cols-1 place-items-center px-4">
        {channel && (
          <Channel
            channel={channel}
            className="max-w-4xl mx-auto my-3"
          />
        )}
        {videos.map((video) => (
          <VideoCardLong key={video.yt_video_id} video={video} />
        ))}
      </div>
    </>
  )
}

export default SearchPage;