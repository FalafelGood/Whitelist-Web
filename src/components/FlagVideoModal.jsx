// J.M.J.

import { useState } from 'react'
import { FaRegFlag } from 'react-icons/fa'

function FlagVideoModal({ ytVideoId }) {
  const [open, setOpen] = useState(false)
  const [report, setReport] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const reportLen = report.length
  const MAX_REPORT_LEN = 500

  function resetAndClose() {
    setReport('')
    setEmail('')
    setStatus(null)
    setErrorMessage('')
    setOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch(`/api/flag_video?yt_video_id=${encodeURIComponent(ytVideoId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report, email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to submit report')
      }

      setReport('')
      setEmail('')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err.message)
    }
  }

  return (
    <>
      <button
        className="btn btn-ghost btn-square"
        title="Flag this video"
        onClick={() => setOpen(true)}
      >
        <FaRegFlag size={20} />
      </button>

      {open && (
        <dialog className="modal modal-open" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Flag this video</h3>
            {!status && (<p className="py-2 text-sm opacity-70">
              See something concerning? Please describe the problem(s) in detail.
            </p>)}

            {status === 'success' ? (
              <div className="flex flex-col gap-4 mt-2">
                <p className="text-success">Thank you! Your report has been submitted.</p>
                <div className="modal-action">
                  <button type="button" className="btn btn-neutral" onClick={resetAndClose}>
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
                <label className="form-control">
                  <span className="label-text mb-1">Your report</span>
                  <span className="ml-2 label-text-alt text-gray-500">{reportLen}/{MAX_REPORT_LEN} characters</span>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="What's wrong with this video?"
                    rows={4}
                    required
                    value={report}
                    onChange={(e) => setReport(e.target.value)}
                    disabled={status === 'submitting'}
                  />
                </label>

                <label className="form-control">
                  <span className="label-text mb-1">Your email (optional)</span>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'submitting'}
                  />
                </label>

                {status === 'error' && (
                  <p className="text-error text-sm">{errorMessage}</p>
                )}

                <div className="modal-action">
                  <button type="button" className="btn" onClick={resetAndClose} disabled={status === 'submitting'}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-neutral" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Submitting…' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <form method="dialog" className="modal-backdrop">
            <button type="submit" onClick={resetAndClose}>close</button>
          </form>
        </dialog>
      )}
    </>
  )
}

export default FlagVideoModal
