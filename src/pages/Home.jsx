import { useEffect, useState, useContext } from 'react'
import Channel from '../components/Channel'
import SearchBar from '../components/SearchBar'
import FeedContext from '../context/FeedContext';

function Home() {

  const {feed, isLoading} = useContext(FeedContext);

  // async function getChannelInfo(handle) {
  //   const API_KEY = "AIzaSyDDh7jUNJd5KM0-1RlrP38-r7z7mdzsbWk";
  //   const URL = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${handle}&key=` + API_KEY

  //   console.log(URL);
  //   const response = await fetch(URL);
  //   const channelData = await response.json();
  //   console.log(channelData.items[0].snippet);
  // }

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