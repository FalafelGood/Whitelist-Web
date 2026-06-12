import { Link } from 'react-router-dom'
import DropBox from "../components/DropBox"
import ContactCard from '../components/ContactCard'
import StatsCounter from "../components/StatsCounter"

function About() {
  return(
    <>
      <div className="hero">
        <div className="hero-content text-center flex-col min-h-[340px]">
        <h1 className="text-6xl mb-4">YouTube for the Church</h1>
        <StatsCounter />
        <p className='mr-4 ml-4 mb-4 text-xl font-light'>
          Whitelist is an unafilliated YouTube filter based on Catholic moral teachings. The goal is to find and platform the most edifying channels on the site using a responsible combination of human moderation and artificial intelligence.
        </p>

        {/* <a href="https://forms.gle/BubgqhSZEaHA3aeW9"
        target="_blank"
        className="btn btn-xl btn-outline btn-neutral mb-4">Register Your Interest!</a> */}
        </div>
      </div>

      <div className="flex justify-center mb-8">
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
              In broad strokes, I identify promising YouTube channels and evaluate their content. If a creator produces high-quality and morally decent videos, their channel will be added to the Whitelist and their content will become available to watch.
              <br /><br />
              This process is expedited through the use of artifical intelligence; Video transcripts are passed into a Large Language Model that summarizes the video, evaluates its moral content, and assigns it a rating.
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

              Videos that earn a classification of "O" are never platformed on the Whitelist. A channel that earns too many "O" ratings is subject to review and removal.
            </>
          } 
        />

        <DropBox 
          title="Is Whitelist safe for children?"
          body={
            <>
              No. While some effort is taken to screen channels, the system is far from airtight. Right now, this website is managed by one guy who spends enough time on YouTube as it is. Children who want to use Whitelist should do so with parental supervision.
            </>
          } 
        />

        <DropBox 
          title="How are you related to YouTube?"
          body={
            <>
              Whitelist is unaffiliated with YouTube, though the hope is to someday partner with them.
            </>
          } 
        />

        {/* <DropBox 
          title="Is there any danger of YouTube shutting you down?"
          body={
            <>
              Naturally
            </>
          } 
        /> */}

        <DropBox 
          title="How does Whitelist generate revenue?"
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
        <ContactCard name="Dr. Hudson Leone" photo="../avatars/hudson.jpg" title="Webmaster" blurb={"Finally found a way to watch YouTube at work"} email="leoneht0@gmail.com" linkedin="https://www.linkedin.com/in/hudson-leone-62924b123" github="https://github.com/FalafelGood"/>
      </div>
    </>
  )
}

export default About