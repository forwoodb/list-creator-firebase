/* eslint-disable react/prop-types */
import { getAuth, signOut } from "firebase/auth";

export default function SignOut() {
  const logout = () => {
    const auth = getAuth()
    signOut(auth)
      .then((res) => {
        console.log(res); 
        window.location.reload()
      })
      .catch((err) => {
        console.log(err); 
      }) 
}

  return(
    <>
      <button onClick={logout}>Sign Out</button>
    </>
  )
}