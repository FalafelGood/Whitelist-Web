import DropBox from "../components/DropBox"

function About() {
  return(
    <>
      <div className="hero">
        <div className="hero-content text-center flex-col min-h-[440px]">
        <h1 className="text-6xl mb-4">Internet without evil</h1>
        <p className='mb-4 mr-4 ml-4 text-2xl font-light'>
          Whitelist hopes to be a content curation service based on Catholic moral teachings. Our goal is to find (and platform) the most edifying videos on the internet using a responsible combination of machine learning and human moderation.
        </p>
        </div>
      </div>

      <div className="divider mb-8">
        <h1 className="text-2xl">Q&A</h1>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 mb-8">

        <DropBox 
          title="How does this work?"
          // Pass jsx into the body instead of a string
          body={
            <>
              In broad strokes, our team will identify promising YouTube channels and scrutinize their content. When we find a creator who consistently makes high quality videos in accordance with Catholic moral teachings, we will add them to the whitelist and their videos will become available to watch.
              <br /><br />
              Moreover, each video on the whitelist will be assigned a rating that indicates both its merits and its potential hazards. This way, parents (or sensitive viewers) will be able to filter out any content they deem unsuitable.
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
              Currently, the vision is to sell two products: A home version that has a little bit of everything, and a school version that only contains educational content.
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
                <li>We don't just block sexually explicit content. We disallow everything evil.</li>
                <li>Unlike Canopy or Covenant eyes, Whitelist is based explicitly on Catholic moral teachings.</li>
                <li>Our whitelist based approach, although more restrictive, is considerably safer.</li>
              </ol>
            </>
          } 
        />

      </div>
    </>
  )
}

export default About