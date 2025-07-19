// This context is responsible for the feed -- essentially a list of videos filtered by a given category.
import {createContext, useState, useEffect} from 'react';

const FeedContext = createContext();

export const FeedProvider = ({children}) => {

  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("recommended");
  // This doesn't really have anything to do with the feed, but it's used by the Home page.
  const [showModal, setShowModal] = useState(true);


  // Temporary "API" for the demo
  async function getVideos(category) {
    const response = await fetch("../whitelist.json")
    const data = await response.json();
    let videos = []

    if (category === "recommended") {
      data.whitelist.map((channel, idx) => {
        if (channel.recommended) {
          videos.push(channel)
        }
      })
    } else {
      data.whitelist.map((channel, idx) => {
        if (channel.category === category) {
          videos.push(channel)
        }
      })
    }
    return videos;
  }


  // Run this effect once on page load, or whenever the category changes
  useEffect(() => {
    const fetchFeed = async () => {
      // const request = (category === "recommended" ? "http://localhost:5000/whitelist/?recommended=true" : `http://localhost:5000/whitelist/?category=${category}`);
      // const response = await fetch(request);
      // const data = await response.json();
      // setFeed(data);
      const videos = await getVideos(category);
      setFeed(videos);
      setIsLoading(false);
    }
    fetchFeed();
  }, [category])

  return <FeedContext.Provider value={{
    feed,
    isLoading,
    category,
    setCategory,
    showModal,
    setShowModal
  }}>
    {children}
  </FeedContext.Provider>
}

export default FeedContext