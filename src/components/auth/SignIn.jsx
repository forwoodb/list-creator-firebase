import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginSubmit = (e) => {
    e.preventDefault()
    console.log(email); 
    console.log(password); 

    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user);
        window.location.assign('/')
        // window.location.reload()
      })
      .catch((error) => {
        const errorCode = error.code 
        const errorMessage = error.message 
        console.log(errorCode);
        console.log(errorMessage);
      })
  }

  const demoLogin = () => {
    setEmail('demo@demo.com')
    setPassword('password1234')
  }

  console.log(email);

  return(
      <>
          <h1>Login</h1>
          <form onSubmit={loginSubmit}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value) } />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value) } />
              <button>Log In</button>
          </form>
          <Link to='/signup'>Sign Up</Link>
          <p>Or</p>
          <form onSubmit={loginSubmit}>
            <button onClick={demoLogin}>Demo Login</button>
          </form>
      </>
  )
}