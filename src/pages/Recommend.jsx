import { useState } from 'react'

function Recommend() {
  const [name, setName] = useState('')
  const [channel, setChannel] = useState('')
  const [status, setStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, channel }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to submit recommendation')
      }

      setName('')
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
              <span className="label-text mb-1">Name (optional)</span>
              <input
                type="text"
                className="input w-full bg-white text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

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

            <button
              type="submit"
              className="btn btn-neutral mt-2"
              disabled={status === 'submitting'}
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
