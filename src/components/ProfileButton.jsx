// J.M.J.
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import SignupPrompt from "./SignupPrompt";
import { logClick } from "../util/logClick";

function ProfileButton() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        title="Log in"
        className="cursor-pointer text-gray-400 hover:text-gray-700 transition-colors ml-2"
        onClick={() => {
          logClick("profile_button");
          setOpen(true);
        }}
        aria-label="Profile"
      >
        <CgProfile size={36} />
      </button>
      
      <SignupPrompt 
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="Welcome to Whitelist!"
        message="Sign in or create a new account"
      />
    </>
  )
}

export default ProfileButton;
