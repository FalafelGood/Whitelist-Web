// J.M.J.
import { useState } from 'react'
const MAX_LEN = 64

function Recommend() {
  const [email, setEmail] = useState('')
  const [channel, setChannel] = useState('')
  const [status, setStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  /*
    Hudson's notes:

    Don't be alarmed by the fact that these "constant" terms are derived from state.
    They are only constant during the run of the function.
    When state changes, the component is refreshed and these values change accordingly.
  */
  const emailTooLong = email.length > MAX_LEN
  const channelTooLong = channel.length > MAX_LEN
  const isTooLong = emailTooLong || channelTooLong

  async function handleSubmit(e) {
    e.preventDefault() // Always necessary to prevent page refresh
    if (isTooLong) {
      setStatus('error')
      setErrorMessage(`Please shorten your response to ${MAX_LEN} characters or fewer, then resubmit.`)
      return
    }
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel, email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to submit recommendation')
      }

      setEmail('')
      setChannel('')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err.message)
    }
  }

  return (
    <>
      <div className="hero">
        <div className="hero-content text-center flex-col min-h-[340px]">
          <h1 className="text-4xl mt-8 mb-8">Recommend a Channel</h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md text-left"
          >

            <label className="form-control">
              <span className="label-text mb-1">Channel recommendation</span>
              <input
                type="text"
                className="input w-full bg-white text-black"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                required
              />
            </label>

            <label className="form-control">
              <span className="label-text mb-1">Email (optional)</span>
              <input
                type="text"
                className="input w-full bg-white text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            {isTooLong && (
              <p className="text-error text-center">
                Please keep both fields at {MAX_LEN} characters or fewer.
              </p>
            )}

            <button
              type="submit"
              className="btn btn-neutral mt-2"
              disabled={status === 'submitting' || isTooLong}
            >
              {status === 'submitting' ? 'Submitting…' : 'Submit'}
            </button>

            {status === 'success' && (
              <p className="text-success text-center mt-2">
                Thank you! Your recommendation has been submitted.
              </p>
            )}

            {status === 'error' && (
              <p className="text-error text-center mt-2">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default Recommend
