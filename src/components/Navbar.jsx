import {useState} from 'react';
import {Link} from 'react-router-dom'

const buttons = ['Home', 'About', 'Support'];

function Navbar({ title='Whitelist (Beta!)' }) {

  const [activeBtn, setActiveBtn] = useState(0);

  return (
    <nav className='navbar shadow-lg bg-linear-to-r from-black to-white text-neutral-content w-full'>
      <img src="../src/assets/white-no-text.svg" width="50px" className='ml-4'/>
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <div className="flex-none px-2 mx-2">
            <Link to='/' className='text-3xl font-bold align-middle'>
              {title}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 px-2 mx-2">
        <div className="flex flex-col sm:flex-row justify-end">

          {buttons.map((label, idx) => (
            <Link to={`/${label === 'Home' ? '' : label}`} 
              className={`btn btn-sm rounded-btn mr-2 mb-1 mt-1 ${activeBtn === idx ? 'btn-neutral' : ''}`}
              onClick={()=> setActiveBtn(idx)}
              key={`${label}`}
            >
              {`${label}`}
            </Link>
          ))}
          
        </div>
      </div>


    </nav>
  )
}

export default Navbar;