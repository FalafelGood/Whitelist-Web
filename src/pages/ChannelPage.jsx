import VideoCard from '../components/VideoCard'
import {Link} from 'react-router-dom'

function ChannelPage() {

  return (
    <>
      <h1 className="card-title text-4xl ml-8 mt-8">Videos from Channel Title</h1>
      <div className="grid sm:grid-cols:1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        <VideoCard videoId="663oViTBcE0"/>
        <VideoCard videoId="2cfkI5vjYNI"/>
        <VideoCard videoId="Y3MMBMZT2wo"/>
        <VideoCard videoId="oxra-suTNoY"/>
        <VideoCard videoId="iGUuucy_PME"/>
        <VideoCard videoId="VFVSqgxKveQ"/>
      </div>
    </>
  );

}

export default ChannelPage;