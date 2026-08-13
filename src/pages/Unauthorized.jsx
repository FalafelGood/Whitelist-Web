import { Link } from 'react-router-dom'

function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center mt-16 px-4">
      <h1 className="text-4xl font-bold mb-4">You sly dog!</h1>
      <p className="text-base-content/70 mt-2">You're trying to sneak into somewhere you shouldn't be! Get out of here, you!</p>
      <Link to="/" className="btn btn-primary w-48 mt-8">
        Alright, alright...
      </Link>
    </div>
  )
}

export default Unauthorized;