// J.M.J.
import { useState, useContext } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import Channel from '../components/Channel'
import SearchBar from '../components/SearchBar'

function Home() {

  // const { category, setCategory } = useContext(FeedContext)
  const [category, setCategory] = useState('all');
  const [seed] = useState(() => crypto.randomUUID());
  const limit = 12;

  async function loadChannels({ queryKey, pageParam = 1 }) {
    // Destructure and ignore first element
    const [_key, category, seed] = queryKey;
    const res = await fetch(
      `api/channels?category=${category}&seed=${seed}&page=${pageParam}&limit=${limit}`
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
        queryKey: ['channels', category, seed], 
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
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>Something went wrong!</h1>
  }

  const pages = data?.pages ?? [];
  const channels = pages.flatMap(page => page.channels ?? []);

  return (
    <div>
      <SearchBar category={category} setCategory={setCategory}/>
      <div className="grid md:grid-cols:1 lg:grid-cols-2 place-items-center 2xl:grid-cols-3">
        {channels.map((channel, idx) => (
          <Channel key={idx} channel={channel} />
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
    </div>
  );
}

export default Home