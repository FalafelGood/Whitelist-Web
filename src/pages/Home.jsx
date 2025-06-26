import SearchBar from '../components/SearchBar'
import VideoPlayer from '../components/VideoPlayer'
import Channel from '../components/Channel'
import VideoCard from '../components/VideoCard'

function Home() {
  return(
    <div>
      <SearchBar />
      <h1 className="text-2xl">Featured channels</h1>
      <VideoCard videoId="ieqsL5NkS6I"/>
      <VideoPlayer videoId="sH3Br9SyzRU"/>
      <Channel /> 
    </div>
  )
}

export default Home