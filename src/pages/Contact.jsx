import ContactCard from "../components/ContactCard";

function Contact() {
  return (
    <>
      <div className="hero">
        <div className="hero-content text-center flex-col min-h-[220px]">
        <h1 className="text-6xl">Meet the team!</h1>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-center items-center gap-4">

        <ContactCard name="Dr. Hudson Leone" photo="../avatars/hudson.jpg" title="Founder" blurb={"\"He's a little confused but he's got the spirit!\""} email="leoneht0@gmail.com" linkedin="https://www.linkedin.com/in/hudson-leone-62924b123" github="https://github.com/FalafelGood"/>

        <ContactCard name="Dr. Samuel Marks" photo="../avatars/sam.jpeg" title="C.T.O." blurb="Fast. Smart. Efficient." email="samuelmarks@gmail.com" linkedin="https://www.linkedin.com/in/samuelmarks/" github="https://github.com/SamuelMarks"/>
      </div>

    </>
  )
}

export default Contact;