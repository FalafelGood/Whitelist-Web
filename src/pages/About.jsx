import DropBox from "../components/DropBox"

function About() {
  return(
    <>
      <div className="hero">
        <div className="hero-content text-center flex-col min-h-[340px]">
        <h1 className="text-6xl mb-4">Internet without evil</h1>
        <p className='mr-4 ml-4 text-2xl font-light'>
          Whitelist hopes to be a content curation service based on Catholic moral teachings. Our goal is to find (and platform) the most edifying videos on the internet using a responsible combination of machine learning and human moderation.
        </p>
        </div>
      </div>

      <div className="divider mb-8">
        <h1 className="text-2xl">Q&A</h1>
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
              No, but we like the idea of developing a school-friendly version! YouTube is a fantastic educational resource, but it's dangerous in the classroom. With Whitelist, we could minimize distractions by limiting browsing activity to educational videos only.
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
                <li>We don't just block or warn about sexually explicit content. We disallow everything evil.</li>
                <li>Unlike Canopy or Covenant eyes, Whitelist is explicitly Catholic.</li>
                <li>Our whitelist based approach, although more restrictive, is considerably safer since all content is approved in advance by our team.</li>
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
              At scale however, this becomes a valid concern. Using the YouTube API for commercial purposes means we have to pay YouTube a subscription fee and abide by their terms of service. Being dependent on a powerful third-party is obviously a risk we'd like to mitigate.
            </>
          } 
        />

        <DropBox 
          title="How will you decide what goes on the whitelist?"
          body={
            <>
              Candidate videos will be graded on their merits and hazards according to an open standard we're developing. If a video has sufficient merit and a tolerable depiction of evil, the video will be added to the Whitelist.
              <br />
              <br />
              Naturally, what is “tolerable” will depend on the viewer's maturity. Parents and sensitive individuals will be able to filter out content based on the ratings they are comfortable with.
            </>
          } 
        />

        <DropBox 
          title="What is your rating system?"
          body={
            <>
              Candidate videos will be graded on their merits and hazards according to an open standard we're developing. If a video has sufficient merit and a tolerable depiction of evil, the video will be added to the Whitelist.
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