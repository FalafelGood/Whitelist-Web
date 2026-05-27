import DropBox from "../components/DropBox"
import StatsCounter from "../components/StatsCounter"

function About() {
  return(
    <>
      <div className="hero">
        <div className="hero-content text-center flex-col min-h-[340px]">
        <h1 className="text-6xl mb-4">YouTube for the Church.</h1>
        <StatsCounter />
        <p className='mr-4 ml-4 mb-4 text-xl font-light'>
          Whitelist is an unafilliated YouTube filter based on Catholic moral teachings. The goal is to find and platform the most edifying channels out there using a responsible combination of human moderation and artificial intelligence.
        </p>

        {/* <a href="https://forms.gle/BubgqhSZEaHA3aeW9"
        target="_blank"
        className="btn btn-xl btn-outline btn-neutral mb-4">Register Your Interest!</a> */}
        </div>
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
              In broad strokes, our team will identify promising YouTube channels and scrutinize their content. When we find a creator who consistently makes high quality videos in accordance with Catholic moral teachings, we will add them to the whitelist and their videos will become available to watch.
              <br /><br />
              Moreover, each video on the whitelist will be assigned a rating that indicates both its merits and its hazards. This way, parents (or sensitive viewers) will be able to filter out any content they deem unsuitable.
            </>
          } 
        />

        <DropBox 
          title="Who is Whitelist for?"
          body={
            <>
              Everyone! We're building Whitelist to be enjoyed by children, parents, schools, and whoever else wants to watch good, clean videos.
            </>
          } 
        />

        <DropBox 
          title="Is Whitelist an educational platform?"
          body={
            <>
              No, but we like the idea of developing a school-friendly version! YouTube is a fantastic educational resource, but it can be dangerous in the classroom. With a modified version of Whitelist, we could improve the experience by limiting browsing activity to educational videos only.
            </>
          } 
        />

        <DropBox 
          title="I've heard of content-filtering software like Canopy and Covenant Eyes. Is Whitelist anything like that?"
          body={
            <>
              Yes and no. We have the same objective of creating a safer internet, but we differ in our methodology. Services like Canopy or Covenant Eyes block sexually explicit content using a combination of database queries and real-time filtering. Whitelist improves on these kind of services in three main ways:
              <br />
              <br />

              <ol type="1" className="list-decimal ml-6">
                <li>We don't just block or warn users about sexually explicit content. We disallow everything evil.</li>
                <li>Unlike Canopy or Covenant eyes, Whitelist is explicitly Catholic.</li>
                <li>Our whitelist based approach, although more restrictive, is considerably safer since all content is approved in advance.</li>
              </ol>
            </>
          } 
        />

        <DropBox 
          title="How are you related to YouTube?"
          body={
            <>
              Whitelist is unaffiliated with YouTube, though this demo was made possible with the YouTube API; This is a service that allows us to fetch YouTube videos and play them on our website.
            </>
          } 
        />

        <DropBox 
          title="Is there any danger of YouTube shutting you down?"
          body={
            <>
              For a demo like this, no. 
              <br />
              <br />
              At scale however, this becomes a valid concern. Using the YouTube API for commercial purposes means paying YouTube a subscription fee and abiding by their terms of service. Being dependent on a powerful third-party is obviously a risk we'd like to mitigate.
            </>
          } 
        />

        <DropBox 
          title="How will you decide what goes on the whitelist?"
          body={
            <>
              Candidate videos will be graded on their merits and hazards according to an open standard we're developing called the Catholic Rating System. If a video has sufficient merit and a tolerable treatment of evil, the video will be added to the Whitelist.
              <br />
              <br />
              Naturally, what is “tolerable” will depend on the viewer's maturity. Parents and sensitive individuals will be able to filter out content based on the ratings they are comfortable with.
            </>
          } 
        />
      </div>

    </>
  )
}

export default About