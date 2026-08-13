// J.M.J.
import { Link, useSearchParams } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import Channel from '../components/Channel'
import Loading from './Loading'
import CategoriesBar from '../components/CategoriesBar';
import AdminTools from '../components/AdminTools'
import ErrorPage from './Error';
import Unauthorized from './Unauthorized';
import { FaRegHeart } from "react-icons/fa";

// Stable for the life of the page load; survives Home remounts on client-side nav.
// Need to use state if I want a "randomize" button that changes seed
const homeSeed = crypto.randomUUID()

function Home() {

  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') ?? 'all'
  const limit = 12;

  async function loadChannels({ queryKey, pageParam = 1 }) {
    // Destructure and ignore first element
    const [_key, category, seed] = queryKey;
    const res = await fetch(
      `api/channels?category=${category}&seed=${seed}&page=${pageParam}&limit=${limit}`
    )
    if (!res.ok) {
      const err = new Error(`HTTP code ${res.status}`);
      err.status = res.status
      throw err;
    }
    return res.json();
  }

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({ 
        queryKey: ['channels', category, homeSeed], 
        queryFn: loadChannels,
        getNextPageParam: (lastPage, allPages) => {
          const loadedThisPage = lastPage.channels?.length ?? 0;
          return loadedThisPage === limit
            ? allPages.length + 1
            : undefined;
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false
  });

  if (isPending) {
    return (
      <>
        <Loading/>
      </>
    )
  }

  if (isError) {
    console.log(error.status);
    if (error.status === 401) {
      return <Unauthorized />
    }
    return <ErrorPage />
  }

  const pages = data?.pages ?? [];
  const channels = pages.flatMap(page => page.channels ?? []);

  return (
    <div>
      <CategoriesBar category={category} />
      <AdminTools />
      <div className="grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 place-items-center gap-x-6 gap-y-8 px-4 pb-4 mt-8">
        {channels.map((channel, idx) => (
          <Channel key={idx} channel={channel} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-8 mt-4 mb-8">
        <Link to="/recommend" className="btn btn-md btn-neutral btn-outline">
          <span className="mr-1">
            Recommend a channel
          </span>
          <FaRegHeart size={16} />
        </Link>
        <button
          className="btn btn-md w-48 btn-outline btn-neutral btn-outline"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      </div>
    </div>
  );
}

export default Home