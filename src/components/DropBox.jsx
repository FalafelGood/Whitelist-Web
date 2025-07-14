function DropBox({ title, body }) {
  return (
    <div tabIndex="0" className="bg-white border-solid border-1 border-color-black text-black focus:bg-black focus:text-white collapse collapse-arrow w-3/4 max-w-[900px] transition duration-500 ease-in-out" >
      <div className="collapse-title font-bold">
        {title}
      </div>
      <div className="collapse-content text-sm">
        {body}
      </div>
    </div>
  )
}

export default DropBox