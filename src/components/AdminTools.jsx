import { Show, UserButton } from '@clerk/react'
import { Link } from 'react-router-dom';

// J.M.J.
function AdminTools() {
  return (
    <Show when="signed-in">
      <div className="flex justify-center px-4 mt-6">
        <div className="card bg-neutral-100 border border-neutral-300 w-full max-w-md shadow-md">
          <div className="card-body gap-6">
            <div className="flex items-center justify-between gap-4">
              <h1 className="card-title text-xl text-red-500">Admin Tools</h1>
              <UserButton />
            </div>

            <form className="flex flex-col gap-3 text-left">
              <label className="form-control">
                <span className="label-text mb-1">Add new channel</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    className="input w-full flex-1 bg-white text-black"
                    placeholder="Channel handle (e.g. @pintswithaquinas)"
                  />
                  <button type="submit" className="btn btn-warning sm:w-auto">
                    Submit
                  </button>
                </div>
              </label>
            </form>

            <div className="divider my-0 text-sm">Browse</div>

            <div className="flex flex-col gap-2">
              <Link to="/" className="btn btn-outline btn-neutral">
                Browse unmoderated channels
              </Link>
              <Link to="/" className="btn btn-outline btn-neutral">
                Browse flagged videos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Show>
  )
  // Welcome {name}. You are currently logged in with admin privleges
  // Add channel
  // Browse unmoderated channels
  // Rerate video
  // Rerate channel
}

export default AdminTools;
