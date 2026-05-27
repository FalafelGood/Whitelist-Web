import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const buttons = ['Home', 'About'];

function Navbar({ title = 'Whitelist' }) {
  const [activeBtn, setActiveBtn] = useState(0);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const searchQuery = trimmed.split(/\s+/).join('+');
    navigate(`/search?search_query=${encodeURIComponent(searchQuery)}`);
  }

  return (
    <nav className="navbar shadow-lg bg-linear-to-r from-black to-white text-neutral-content w-full">
      <div className="flex-1 flex items-center px-2 mx-2">
        <img src="../white-no-text.svg" width="50px" className="ml-2" alt="" />
        <Link to="/" className="hidden sm:inline text-3xl font-bold ml-2">
          {title}
        </Link>
      </div>

      <div className="flex-1 flex justify-center px-2 mx-2">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search"
            className="input w-full min-w-48 bg-white text-black placeholder:text-gray-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="flex-1 flex justify-end px-2 mx-2">
        <div className="flex flex-col sm:flex-row">
          {buttons.map((label, idx) => (
            <Link
              to={`/${label === 'Home' ? '' : label}`}
              className={`btn btn-sm rounded-btn mr-2 mb-1 mt-1 ${activeBtn === idx ? 'btn-neutral' : ''}`}
              onClick={() => setActiveBtn(idx)}
              key={label}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
