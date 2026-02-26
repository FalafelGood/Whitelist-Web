// This context is responsible for the feed -- essentially a list of videos filtered by a given category.
import {createContext, useState, useEffect} from 'react';
import { neon } from '@neondatabase/serverless';

const FeedContext = createContext();

export const FeedProvider = ({children}) => {

  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("all");

  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    while(currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // Shuffle elements with array destructuring
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  async function getChannels(category) {
    // New code:
    try {
      const response = await fetch('api/channels');
      if (!response.ok) {
        throw new Error( `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      let channels = data.channels || [];
      let feed = [];

      // Filter videos based on category
      if (category === "all" || category === undefined) {
        feed = [...channels]
      } else {
        channels.map((channel, idx) => {
          if (channel.category === category) {
            feed.push(channel)
          }
        })
      }
      return shuffleArray(feed);
    } catch (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
  }

  // Run this effect once on page load, or whenever the category changes
  useEffect(() => {
    const fetchFeed = async () => {
      const videos = await getChannels(category);
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
  }}>
    {children}
  </FeedContext.Provider>
}

export default FeedContext