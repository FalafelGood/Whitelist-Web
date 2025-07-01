// import input from "daisyui/components/input";

function SearchBar() {
  return (
    <div className="navbar bg-base-200 shadow-sm flex flex-col space-between w-full">

      <input type="text" placeholder="Search the Whitelist" className="input input-neutral input-lg mb-2 mt-2 w-7/8 max-w-[800px]"/>

      <div className="flex flex-row items-center">
        <h1 className="mr-2">Browsing by:</h1>
        <div className="dropdown">
          <div tabIndex="0" role="button" className="btn m-1">Recommended</div>
          <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li><a>Recommended</a></li>
            <li><a>Religion</a></li>
            <li><a>Math</a></li>
            <li><a>Science</a></li>
            <li><a>Music</a></li>
            <li><a>History</a></li>
            <li><a>Computer Science</a></li>
            <li><a>Visual Art</a></li>
            <li><a>Nature</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;