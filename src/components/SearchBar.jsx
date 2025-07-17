// import input from "daisyui/components/input";
import { useContext } from 'react';
import FeedContext from '../context/FeedContext';

function SearchBar() {

  const { category, setCategory } = useContext(FeedContext)

  function capitalizeFirstChar(str) {
    if (str.length === 0) {
      return ""
    } else {
      return (str.charAt(0).toUpperCase() + str.slice(1))
    }
  }

  const categories = [
    'recommended',
    'religion',
    'math',
    'science',
    'music',
    'history',
    'computer science',
    'art'
  ]

  return (
    <div className="navbar bg-base-200 shadow-sm flex flex-col space-between w-full">

      {/* <input type="text" placeholder="Search the Whitelist" className="input input-neutral input-lg mb-2 mt-2 w-7/8 max-w-[800px]"/> */}

      <div className="flex flex-row items-center">
        <h1 className="mr-2">Browsing by:</h1>
        <div className="dropdown">
          <div tabIndex="0" role="button" className="btn m-1">{`${capitalizeFirstChar(category)}`}</div>
          <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            {categories.map((cat) => (
              <li key={cat}>
                <a onClick={() => setCategory(cat)}>{capitalizeFirstChar(cat)}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;