import { useEffect, useState } from 'react'
import Channel from '../components/Channel'
import SearchBar from '../components/SearchBar'

function Home() {

  // Note -- this code can (and probably should) go into a context.
  const [whitelist, setWhitelist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Run this effect once on page load:
  useEffect(() => {
    const fetchWhitelist = async () => {
      const response = await fetch("/whitelist.json");
      const data = await response.json();
      setWhitelist(data);
      setIsLoading(false);
    }
    fetchWhitelist();
  }, [])

  return( isLoading ? (<h1>Loading...</h1>) :
    <div>
      <SearchBar />
      <div className="grid md:grid-cols:1 lg:grid-cols-2 place-items-center">
        {/* List all recommended channels */}
        {whitelist[0].channels.map((channel, idx) => (
          <Channel key={idx} channel={channel} />
        ))}
      </div>
    </div>
  )
}

export default Home