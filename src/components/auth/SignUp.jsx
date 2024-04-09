import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const createAccount = (e) => {
        e.preventDefault() 
        console.log(email);
        console.log(password);

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            window.location.assign('/')
            console.log(user);
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }

    return(
        <>
            <h1>Create Account</h1>
            <form onSubmit={createAccount}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value) }/>
                <button>Sign Up</button>
            </form>
            <p>Or <Link to='/login'>Sign In</Link></p>
        </>
    )
}