import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../css/sign.css'
import { authService } from '../database';

const SignUp = () => {

    const [signEmail, setSignEmail] = useState("")
    const [signPassword, setSignPassword] = useState("")

    const [signError, setSignError] = useState([])
    const [signUser, setSignUser] = useState(null)

    const signUpSubmit = async (event) => {
        event.preventDefault();
        await createUserWithEmailAndPassword(authService, signEmail, signPassword).then((userCredential) => {
            const newUser = userCredential.user;
            setSignUser(newUser)
        })
        .catch((error) => {
            const SignErrorCode = error.code;
            const SignErrorMessage = error.message;

            setSignError([SignErrorCode, SignErrorMessage])
        })
    }

    const emailChange = (event) => {
        setSignEmail(event.target.value)
    }

    const passwordChange = (event) => {
        setSignPassword(event.target.value)
    }

    return(
        <div className="sign-wrap">
            <div className="sign-container">
                <p className='xi-twitter sign-twitter-logo'></p>
                <h2>Create your account</h2>
                {signError.map((error) => {
                    return <p className='sign-error'>{error}</p>
                })}
                {signUser && (<Navigate to="/" replace={true}/>)}
                <form onSubmit={signUpSubmit}>
                    <label>
                        <input onChange={emailChange} className='email' type="email" required></input>
                        <span className='email-span'>email</span>
                    </label>
                    <label>
                        <input onChange={passwordChange} className='password' type="password" required />
                        <span className='pass-span'>password</span>
                    </label>
                    <input className='sign' type="submit" value="Sign Up"/>
                </form>
            </div>
        </div>
    )
}

export default SignUp;