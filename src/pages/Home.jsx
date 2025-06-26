import VideoPlayer from '../components/VideoPlayer'
import Channel from '../components/Channel'

function Home() {
  return(
    <div>
      <h1 className="text-2xl">Featured channels</h1>
      <VideoPlayer videoId="sH3Br9SyzRU"/>
      <Channel /> 
    </div>
  )
}

export default Home