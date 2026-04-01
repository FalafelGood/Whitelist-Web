function VideoInfo({ summary, review }) {
  return (
    <div className="card bg-base-300 shadow-md w-full max-w-[2000px]">
      <div className="card-body gap-0 p-4 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
          <div className="card bg-base-200 shadow-sm border border-base-100 flex-1">
            <div className="card-body">
              <h2 className="card-title text-lg">Summary</h2>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {summary?.trim() ? summary : 'No summary available.'}
              </p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-sm border border-base-100 flex-1">
            <div className="card-body">
              <h2 className="card-title text-lg">Review</h2>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {review?.trim() ? review : 'No description available.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoInfo
