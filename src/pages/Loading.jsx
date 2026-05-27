function Loading({ className = '', fullScreen = true }) {
  const wrapperClass = fullScreen
    ? `flex h-screen items-center justify-center ${className}`
    : `flex items-center justify-center ${className}`

  return (
    <div className={wrapperClass.trim()}>
      <img src="../270-ring.svg" width="100" alt="" />
    </div>
  )
}

export default Loading
