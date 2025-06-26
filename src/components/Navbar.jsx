import {Link} from 'react-router-dom'

function Navbar({ title='Whitelist' }) {
  return (
    <nav className='navbar mb-12 shadow-lg bg-linear-to-r from-black to-white  text-neutral-content w-full'>
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
        <div className="flex justify-end">
          <Link to='/' className='btn btn-neutral btn-sm rounded-btn'>
              Home
          </Link>
          <Link to='/about' className='btn btn-sm rounded-btn'>
              About
          </Link>
        </div>
      </div>


    </nav>
  )
}

export default Navbar;