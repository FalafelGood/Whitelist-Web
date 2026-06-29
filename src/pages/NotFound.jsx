import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-16 px-4">
      <h1 className="text-4xl font-bold">Whoops!</h1>
      <p className="text-base-content/70 mt-2">This page doesn't exist. Check the URL and try again</p>
      <Link to="/" className="btn btn-primary w-48 mt-8">
        Get me out of here!
      </Link>
    </div>
  )
}

export default NotFound;