import VideoPlayer from '../components/VideoPlayer'
import DropBox from '../components/DropBox';
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
      <div className="hero-content flex-col">
        {/* <h1 className="text-xl">Video Title</h1> */}
        <VideoPlayer videoId={`${videoId}`}/>
        {/* <DropBox title="Summary" body={`${data.video.summary_text}`}></DropBox>
        <DropBox title="Review" body={`${data.video.review_text}`}></DropBox> */}
        <VideoInfo 
          summary={`${data.video.summary_text}`}
          review={`${data.video.review_text}`}
        >
        </VideoInfo>
        <div className="flex gap-4">
          <Link to={`/channel?cid=${data.video.yt_channel_id}`} className="btn btn-primary">Back</Link>
          <Link to="/" className="btn btn-primary">Home</Link>
        </div>
      </div>
    </div>
  )
}

export default VideoPage;