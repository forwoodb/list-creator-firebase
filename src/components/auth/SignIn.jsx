// https://www.youtube.com/watch?v=Vv_Oi7zPPTw

import { useState } from "react"
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = (e) => {
    e.preventDefault()
    console.log(email);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // Signed in 
        // const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
    // return 
  }

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log Into Account</h1>
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={((e) => setEmail(e.target.value) )}
        />
        <input 
          type="password" 
          placeholder="Enter your password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  ) 
}

export default SignIn