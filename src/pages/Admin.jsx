import { useUser, Show, SignIn, UserButton } from '@clerk/react'

function Admin() {

  const { isSignedIn, user, isLoaded } = useUser();

  if(!isLoaded) return <div>Loading...</div>

  return (
    <main className="app">
      <Show when="signed-out">
        <div className="flex items-center justify-center m-32">
          <SignIn />
        </div>
      </Show>
      <Show when="signed-in">
        <div className="flex flex-col items-center justify-center gap-4 m-32">
          <h1 className="text-4xl">Hello {user?.firstName}!</h1> 
          <h3>You are currently signed in with admin privleges.</h3>
          <h3>Click on the icon below to log out or reset your password.</h3>
          <UserButton />
        </div>
      </Show>
    </main>
  )
}

export default Admin