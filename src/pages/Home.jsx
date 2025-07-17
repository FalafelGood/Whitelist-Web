import { useEffect, useState, useContext } from 'react'
import Channel from '../components/Channel'
import SearchBar from '../components/SearchBar'
import FeedContext from '../context/FeedContext';

function Home() {

  const {feed, isLoading, showModal, setShowModal} = useContext(FeedContext);
  // const [showModal, setShowModal] = useState(true);

  return( isLoading ? (<h1>Loading...</h1>) :
    <div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white max-w-[500px] p-8 rounded shadow flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl">Attention:</h1>
            <p className="text-center">
              This web page is a proof-of-concept for a content curation service called Whitelist. The videos on this demo were selected for the sake of illustration, and have not been thoroughly screened. Please exercise caution.
            </p>
            <button 
              onClick={() => setShowModal(false)}
              className="btn btn-neutral btn-outline"
              >Ok</button>
          </div>
        </div>
      )}
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