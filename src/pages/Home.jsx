import { useEffect, useState, useContext } from 'react'
import Channel from '../components/Channel'
import SearchBar from '../components/SearchBar'
import FeedContext from '../context/FeedContext';

function Home() {

  const {feed, isLoading} = useContext(FeedContext);

  return( isLoading ? (<h1>Loading...</h1>) :
    <div>
      <SearchBar />
      <div className="grid md:grid-cols:1 lg:grid-cols-2 place-items-center 2xl:grid-cols-3">
        {feed.map((channel, idx) => (
          <Channel key={idx} channel={channel} />
        ))}
      </div>
    </div>
  )
}

export default Home