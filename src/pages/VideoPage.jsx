import VideoPlayer from '../components/VideoPlayer'
import Loading from './Loading'
import VideoInfo from '../components/VideoInfo';
import {Link} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

function VideoPage() {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString)
  const videoId = urlParams.get('v');

  async function loadVideo() {
    const res = await fetch(
      `/api/video?video_id=${videoId}`
    )
    if (!res.ok) {
      throw new Error(`HTTP code ${res.status}`);
    }
    return res.json();
  }

  const { isPending, isError, data, Error } = useQuery({ 
    queryKey: [videoId], 
    queryFn: loadVideo,
  })

  if (isPending) {
    return (
      <Loading/>
    )
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="hero">
      <div className="hero-content flex-col w-full max-w-[2000px]">
        <VideoPlayer videoId={`${videoId}`}/>
        <VideoInfo
          videoData={data.videoData}
          channelData={data.channelData}
        >
        </VideoInfo>
        <div className="flex gap-4">
          <Link to="/" className="btn btn-primary">Home</Link>
        </div>
      </div>
    </div>
  )
}

export default VideoPage;