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
      <div className="grid md:grid-cols:1 lg:grid-cols-2 place-items-center">
        <Channel /> 
        <Channel /> 
      </div>
    </div>
  )
}

export default Home