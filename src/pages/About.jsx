import DropBox from "../components/DropBox"

function About() {
  return(
    <>
      <div className="hero">
        <div className="hero-content text-center flex-col min-h-[340px]">
        <h1 className="text-6xl mb-4">Internet without evil</h1>
        <p className='mr-4 ml-4 mb-4 text-xl font-light'>
          Whitelist hopes to be a content curation service based on Catholic moral teachings. Our goal is to find (and platform) the most edifying videos on the internet using a responsible combination of machine learning and human moderation.
        </p>

        <a href="https://forms.gle/BubgqhSZEaHA3aeW9"
        target="_blank"
        className="btn btn-xl btn-outline btn-neutral mb-4">Register Your Interest!</a>
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

      <div className="divider mt-12 mb-12">
        <h1 className="text-3xl">The Catholic Rating System</h1>
      </div>

      <div className="hero">
        <div className="hero-content text-center flex-col min-h-[100px]">
        <p className='mr-4 ml-4 mb-8 text-lg font-light'>
          The Catholic Rating System (CRS) is an open standard we're developing that classifies the merits and hazards of video content. All videos on the whitelist will be rated by the CRS.
        </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 mb-8">

        <DropBox 
          title="How are you making sure the CRS is consistent with Church teachings?"
          body={
            <>
              This initial version of the CRS was developed with the help of a moral theologian named Christian Stevens (see the contact page for more info).
              <br />
              <br />
              As Whitelist grows, the hope is that the CRS will become a collaborative effort of the church. This is not a project for any one person!
            </>
          } 
        />

        <DropBox 
          title="What kinds of media will the CRS classify?"
          body={
            <>
              Our primary goal is to rate YouTube videos, though we hope the CRS will eventually be used for all kinds of media including books, films, podcasts, and articles.
            </>
          } 
        />

        <DropBox 
          title="Why consider the merits of a video? Why not just focus on its hazards?"
          body={
            <>
              According to Saint Thomas, the moral life consists of both avoiding the evil and pursuing the good. We want our rating system to incorperate both of these aspects!
            </>
          } 
        />

      </div>

      <div className="divider mt-12 mb-12">
        <h3 className="text-xl">Classifying Virtue</h3>
      </div>

      <div className="hero">
        <div className="hero-content text-center flex-col min-h-[100px]">
        <p className='mr-4 ml-4 mb-8 text-lg font-light'>
          Our preliminary approach for classifying virtue is an integer scale that indicates the <b>intention</b> of the video. The higher its score, the higher its aim.

          {/* Any positive score is theoretically suitable for the whitelist provided the material */}

          {/* It's important to note that a high score does not necessarily mean the video is high quality (and vice-versa). All the score describes is the intention of the video. Some videos have lofty aims, while others are just meant for recreation. Both are valid in their proper context! */}
        </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-2/3">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-300">
              <th>Tier</th>
              <th>Description</th>
              <th>Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-red-200">
              <td>0</td>
              <td>Videos in this tier have little-to-no merit and are <b>not permitted</b> on the whitelist. They are vapid, low-value, and unprofitable to watch.</td>
              <td>'Brain-rot', 'unboxing videos', 'click-bait', etc.</td>
            </tr>
            {/* row 1 */}
            <tr className="">
              <td>1</td>
              <td>
                Videos in this tier aim at the virtue of <b>eutrapelia</b> or recreation. The material is meant to be fun and relaxing.
              </td>
              <td>Vlogs, nature videos, comedy, benign video essays, podcasts, music videos, etc.</td>
            </tr>
            {/* row 2 */}
            <tr className="bg-base-300">
              <td>2</td>
              <td>Videos in this tier aim at the virtue of art (<b>ars</b>). They provide tutorials or explanations for a craft, hobby, or other practical skill.</td>
              <td>Music lessons, painting classes, woodworking, etc.</td>
            </tr>
            {/* row 3 */}
            <tr className="">
              <td>3</td>
              <td>
                Videos in this tier aim at the virtue of knowledge (<b>scientia</b>).
                The goal is to educate a viewer about a substantial academic topic.
              </td>
              <td>Lectures, debates, online classes, historical documentaries, long-form intellectual discussions, etc.</td>
            </tr>
            {/* row 4 */}
            <tr className="bg-base-300">
              <td>4</td>
              <td>
                Videos in this tier aim at the <b>cardinal virtues</b> (prudence, justice, temperance, and fortitude).
                This content promotes the good, the true, and the beautiful in accordance with the natural law.
                </td>
              <td>
                Moral philosophy, self-improvement, rhetoric, fine arts, etc.
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                The videos in this highest tier aim at the <b>theologial virtues</b> (faith, hope, and love). This content explicitly pertains to God and / or His church.
              </td>
              <td>
                Apologetics, faith-based content, etc.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>

      <div className="divider mt-12 mb-12">
        <h3 className="text-xl">Classifying Hazards</h3>
      </div>

      <div className="hero">
        <div className="hero-content text-center flex-col min-h-[100px]">
          <p className='mr-4 ml-4 mb-8 text-lg font-light'>
            Our initial attempt at classifying video hazards is inspired by the NFPA 704 -- a chemistry standard used to identify dangerous materials. It has three colored squares where each colored square contains a number indicating the severity of a particular threat.
          </p>
          <div className="flex flex-col justify-center items-center">
            <img 
              src="https://risk-safety.utdallas.edu/files/2022/12/health-fire-hazard-chart-fire-and-life--1024x1024.jpg"
              className="w-2/5"
            />
          </div>
          <p className="mt-8 mr-4 ml-4 mb-8 text-lg font-light">

            Our hazard classification consists of <b>eight categories</b>. The first seven correspond to the <b>seven deadly sins</b> (pride, envy, wrath, sloth, greed, gluttonly, and lust) while the eighth category pertains to the virtue of <b>religion</b> (in plain language, how God and His church are being treated).
          </p>

          <p className="text-xl font-dark mb-8">
            <b>An explicit criteria for these 8 categories is still in development!</b>
          </p>

        </div>
      </div>

    </>
  )
}

export default About