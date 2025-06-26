import VideoCard from '../components/VideoCard'
import {Link} from 'react-router-dom'

function Channel({}) {

  return (
    <div className="card bg-base-500 m-4 shadow-lg sm:max-w[500px] md:max-w-[800px]">
      <h1 className="card-title text-4xl m-2">Channel Title</h1>
      <img className="rounded-xl m-2" src="https://yt3.googleusercontent.com/11ZI9ubgbQ3DcPGyx2v3gJEM_a2lkhDe_BaLKCn0IPMZRmeXvnmR1QnWhe_40n3zJoxVshxOeg=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"></img>
      <div className="flex m-2">
        <img src="https://yt3.ggpht.com/6o5-sqFb5QXukLLSv6KvXsmvpLw8JPMtACPgxkhTUQCiSUZISPumR6GNpwpuHx99JVTV94Bk=s176-c-k-c0x00ffffff-no-rj-mo"
        className="rounded-full max-w-[100px] m-2"
        />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nemo molestias placeat impedit asperiores, iure beatae pariatur eum voluptas porro, laborum non! Illo ullam necessitatibus adipisci autem, perspiciatis aperiam odit ratione nobis excepturi ipsam delectus, quaerat natus facilis error iste, quidem illum saepe itaque laboriosam unde tempora voluptates. Suscipit, reprehenderit.
        </p>
      </div>
      <Link to="/ChannelName" className="btn btn-primary ml-4 mr-4">
      Visit Channel
      </Link>
      <div className="grid sm:grid-cols:1 md:grid-cols-2 place-items-center">
        <VideoCard videoId="2cfkI5vjYNI"/>
        <VideoCard videoId="2cfkI5vjYNI"/>
      </div>
    </div>
  );
}

export default Channel;