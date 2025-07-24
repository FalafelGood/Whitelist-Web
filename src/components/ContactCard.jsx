import { IoIosMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";

function ContactCard({name, photo, title, blurb, email, linkedin=undefined, github=undefined, website=undefined}) {
  return (
    <div className="card card-side bg-base-100 w-1/2 max-w-[550px] h-[250px] min-w-[375px] shadow-lg border border-width-1">
      <figure className="">
        <div className="avatar">
          <div className="w-[200px] rounded-xl m-4">
            <img src={photo} />
          </div>
        </div>
      </figure>

      <div className="card-body">
        <h2 className="card-title text-2xl text-nowrap">{name}</h2>
        <h3 className="text-xl">{title}</h3>
        <p className="w-[200px] text-gray-600">
          {blurb}
        </p>
        <ul>
          <li className="flex flex-row items-center gap-4">
            <IoIosMail className="text-3xl" />
            <a href={email} className="link link-hover text-sm">
              {email}
            </a>
          </li>
          {linkedin &&
          <li className="flex flex-row items-center gap-4">
            <FaLinkedin className="text-3xl" />
            <a href={linkedin} target="_blank" rel="nooper noreferrer" className="link link-hover text-sm">
              LinkedIn Profile
            </a>
          </li>}
          {github &&
          <li className="flex flex-row items-center gap-4">
            <IoLogoGithub className="text-3xl" />
            <a href={github} target="_blank" rel="nooper noreferrer" className="link link-hover text-sm">
              GitHub Profile
            </a>
          </li>}
          {website &&
          <li className="flex flex-row items-center gap-4">
            <CiGlobe className="text-3xl" />
            <a href={website} target="_blank" rel="nooper noreferrer" className="link link-hover text-sm">
              Website
            </a>
          </li>}
        </ul>
      </div>
    </div>
  )
}

export default ContactCard