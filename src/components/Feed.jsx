// J.M.J.

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import VideoCard from './VideoCard'
import Loading from '../pages/Loading'

function Feed({ seed = null }) {
  const [visible, setVisible] = useState(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['randomVideos', seed],
    queryFn: async() => {
      const res = await fetch(`/api/random?seed=${seed}`);
      if (!res.ok) throw new Error(`HTTP status ${res.status}`);
      return res.json();
    },
    enabled: visible,
  })

  const videos = data?.randomVideos ?? [];

  /*
    Note to self:
    `enabled: visible` means that the query only runs when the element is visible
    (i.e. when the switch is toggled)
  */


  if (isLoading) {
    return (
      <div className="w-full">
      <label className="flex items-center gap-3 px-4 py-2 cursor-pointer w-fit">
        <span className="text-base font-bold">Show Random Videos</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={visible}
          onChange={(e) => setVisible(e.target.checked)}
        />
      </label>
      <Loading fullScreen={false} className="mb-6 h-16" />
    </div>
    )
  }
  
  return (
    <div className="w-full">
      <label className="flex items-center gap-3 px-4 py-2 cursor-pointer w-fit">
        <span className="text-md font-bold">Show Random Videos</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={visible}
          onChange={(e) => setVisible(e.target.checked)}
        />
      </label>

      {visible && (
        <div className="w-full overflow-x-auto pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-4 pb-4 w-full">
            {videos.map((video) => (
              <div key={video.yt_video_id} className="">
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Feed
