import { Link } from 'react-router-dom'
import DropBox from "../components/DropBox"
import ContactCard from '../components/ContactCard'
import StatsCounter from "../components/StatsCounter"

function About() {
  return(
    <>
      <div className="hero">
        <div className="hero-content text-center flex-col min-h-[340px]">
        <h1 className="text-6xl my-8">Sometimes it is black and white</h1>
        <StatsCounter />
        <p className='mr-4 ml-4 text-xl font-light'>
          Whitelist is an unafilliated YouTube filter based on Catholic moral teachings. The goal is to find and platform the most edifying channels on the site using a responsible combination of human moderation and artificial intelligence.
        </p>
        <h1>J.M.J.</h1>

        {/* <a href="https://forms.gle/BubgqhSZEaHA3aeW9"
        target="_blank"
        className="btn btn-xl btn-outline btn-neutral mb-4">Register Your Interest!</a> */}
        </div>
      </div>

      <div className="flex justify-center my-8">
        <Link to="/recommend" className="btn btn-primary btn-lg">
          Recommend a Channel
        </Link>
      </div>

      <div className="divider mb-12">
        <h1 className="text-3xl">Q&A</h1>
      </div>


      <div className="flex flex-col justify-center items-center gap-4 mb-8">

        <DropBox 
          title="How does it work?"
          // Pass jsx into the body instead of a string
          body={
            <>
              In broad strokes, I identify promising YouTube channels and evaluate their content. If a creator produces high-quality and morally decent videos, I add their channel to the Whitelist and make their content available to watch.
              <br /><br />
              Every video on the Whitelist is reviewed, summarized, and rated by a Large Language Model. Videos that are given a "morally offensive" rating are never platformed, and a channel that earns too many offensive ratings will be subject to review and removal.
            </>
          } 
        />

        <DropBox 
          title="What's your rating system?"
          body={
            <>
              Whitelist classifies videos using the OSV rating system, which was developed by the USCCB for reviewing movies. The ratings are as follows:

              <ul className="list-disc ml-6 mb-2 mt-2">
                <li>A-I: General patronage</li>
                <li>A-II: Adults & Adolescents</li>
                <li>A-III: Adults</li>
                <li>L: Limited adult audience</li>
                <li>O: Morally offensive</li>
              </ul>

            </>
          } 
        />

        <DropBox 
          title="Is Whitelist safe for children?"
          body={
            <>
              No. While some effort is taken to screen channels, the system is far from airtight. This website is currently run by a guy who spends enough time on YouTube as it is. Children who want to use Whitelist should do so with parental supervision.
            </>
          } 
        />

        <DropBox 
          title="How are you related to YouTube?"
          body={
            <>
              Whitelist is unaffiliated with YouTube.
            </>
          } 
        />

        <DropBox 
          title="How does Whitelist earn revenue?"
          body={
            <>
              Right now it doesn't. This is a passion project that might never go anywhere.
            </>
          } 
        />

        <DropBox 
          title="Do you sell user data?"
          body={
            <>
              No.
            </>
          } 
        />
      </div>

      <div className="divider mt-12 mb-12">
        <h1 className="text-3xl">Contact</h1>
      </div>

      <div className="flex flex-col justify-center items-center mb-16">
        <ContactCard name="Hudson Leone" photo="../avatars/hudson.jpg" title="Webmaster" blurb={"Finally found a way to watch YouTube at work"} email="whitelist_admin@protonmail.com" linkedin="https://www.linkedin.com/in/hudson-leone-62924b123"/>
      </div>
    </>
  )
}

export default About