// J.M.J.
import { useState } from 'react';
import { FaRegHeart } from "react-icons/fa";
import SignupPrompt from "./SignupPrompt";
import { logClick } from "../util/logClick";

function LikeButton() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="btn btn-ghost btn-square"
        title="Like this video"
        onClick={() => {
          logClick("like_button");
          setOpen(true);
        }}
      >
        <FaRegHeart size={20} />
      </button>
      <SignupPrompt
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        message="Sign in or create a new account to like this video"
      />
    </>
  )
}

export default LikeButton;
