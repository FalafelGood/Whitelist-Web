// J.M.J.
import { useState } from "react";
import { logClick } from "../util/logClick";

function SignupPrompt({ open, onClose, title="Great choice!", message}) {

  const [showGoogle, setShowGoogle] = useState(() => Boolean(Math.round(Math.random())));
  const [clicked, setClicked] = useState(false);

  function handleSignUpClick(name) {
    setClicked(true);
    logClick(name);
  }

  function resetAndClose() {
    setClicked(false);
    setShowGoogle(Boolean(Math.round(Math.random())));
    onClose();
  }

  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      {/* Use text-base-content here so we don't accidentially inherit styles */}
      <div className="modal-box text-base-content">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="mb-4">{message}</p>
        
        <div className="flex justify-center">

          {showGoogle &&
            <button
              className="btn bg-white text-black border-[#e5e5e5] mx-auto"
              disabled={clicked}
              onClick={() => handleSignUpClick("google_signup")}
            >
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
            </button>
          }

          {!showGoogle &&
            <button
              className="btn bg-white text-black border-[#e5e5e5] mx-auto"
              disabled={clicked}
              onClick={() => handleSignUpClick("whitelist_signup")}
            >
            <img src="../icon.png" width="25" alt="" />
            Login with Whitelist
            </button>
          }
          
        </div>

        {clicked && (
          <p className="text-info text-sm text-center mt-4">
            Sign-up isn't available yet, but thanks for your interest! Check back soon!
          </p>
        )}
        
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="submit" onClick={resetAndClose}>close</button>
      </form>

    </dialog>
  )
}

export default SignupPrompt;