import { useEffect, useState } from 'react'
import Channel from '../components/Channel'
import SearchBar from '../components/SearchBar'

function Home() {

  // Note -- this code can (and probably should) go into a context.
  const [whitelist, setWhitelist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("recommended")

  // Run this effect once on page load:
  useEffect(() => {
    const fetchWhitelist = async () => {
      const request = (category === "recommended" ? "http://localhost:5000/whitelist/?recommended=true" : `/http://localhost:5000/whitelist/?category=${category}`);
      const response = await fetch(request);
      const data = await response.json();
      console.log(data);
      setWhitelist(data);
      setIsLoading(false);
    }
    fetchWhitelist();
  }, [])

  return( isLoading ? (<h1>Loading...</h1>) :
    <div>
      <SearchBar />
      <div className="grid md:grid-cols:1 lg:grid-cols-2 place-items-center 2xl:grid-cols-3">
        {whitelist.map((channel, idx) => (
          <Channel key={idx} channel={channel} />
        ))}
      </div>
    </div>
  )
}

export default Home