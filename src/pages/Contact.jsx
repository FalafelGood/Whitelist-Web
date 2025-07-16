import ContactCard from "../components/ContactCard";

function Contact() {
  return (
    <>
      <div className="hero">
        <div className="hero-content text-center flex-col min-h-[440px]">
        <h1 className="text-6xl mb-4">Meet the team!</h1>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4">

        <ContactCard name="Dr. Hudson Leone" photo="../src/assets/avatars/hudson.jpg" title="Founder" blurb={"\"He's a little confused but he's got the spirit!\""} email="leoneht0@gmail.com" linkedin="https://www.linkedin.com/in/hudson-leone-62924b123" github="https://github.com/FalafelGood"/>

        <ContactCard name="Dr. Samuel Marks" photo="../src/assets/avatars/sam.jpeg" title="C.T.O." blurb="Fast. Smart. Efficient." email="samuelmarks@gmail.com" linkedin="https://www.linkedin.com/in/samuelmarks/" github="https://github.com/SamuelMarks"/>
      </div>

    </>
  )
}

export default Contact;