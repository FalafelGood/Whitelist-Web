// J.M.J.
import { useState } from "react";
import SignupPrompt from "./SignupPrompt";
import { logClick } from "../util/logClick";

function SubscribeButton({ size='lg' }) {

  const [open, setOpen] = useState(false);
  const buttonStyle = `btn btn-neutral btn-${size} btn-outline max-w-32`

  return (
    <>
      <button 
        className={buttonStyle}
        onClick={() => {
          logClick("subscribe_button");
          setOpen(true);
        }}
      >
        Subscribe
      </button>
      <SignupPrompt
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        message="Sign in or create a new account to subscribe to this channel"
      />
    </>
  )
}

export default SubscribeButton;