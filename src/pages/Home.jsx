import { useEffect, useState } from 'react'
import Channel from '../components/Channel'

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
      <div className="grid md:grid-cols:1 lg:grid-cols-2 place-items-center">
        <Channel channel={whitelist[0].channels[0]}/> 
        <Channel channel={whitelist[0].channels[1]}/>
        <Channel channel={whitelist[0].channels[2]}/> 
        <Channel channel={whitelist[0].channels[3]}/>
        <Channel channel={whitelist[0].channels[4]}/>
        <Channel channel={whitelist[0].channels[5]}/> 
      </div>
    </div>
  )
}

export default Home