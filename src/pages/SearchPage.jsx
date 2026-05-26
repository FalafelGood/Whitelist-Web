import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import SearchBar from '../components/SearchBar';
import Loading from './Loading';
import VideoCardLong from '../components/VideoCardLong';

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

  if (isPending) return (
    <>
    <SearchBar/>
    <Loading/>
    </>
  );
  if (isError) return <h1>Sometime went wrong!</h1>

  const videos = data?.rows ?? [];

  return (
    <>
      <SearchBar/>
      {/* <h1 className="card-title text-4xl ml-8 mt-8">Videos from {name}</h1> */}
      <div className="flex items-center justify-center">
        <Link to="/" className="btn btn-primary w-48 ml-8 mr-8 mt-6">
          Home
        </Link>
      </div>
      <div className="grid grid-cols-1 place-items-center">
        {videos.map((video) => (
          <VideoCardLong key={video.yt_video_id} video={video} />
        ))}
      </div>
    </>
  )
}

export default SearchPage;