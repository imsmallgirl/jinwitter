import React, { useEffect, useState } from 'react';
import '../css/login.css'
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../database';
import Social from './Social';


const Login = () => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [loginError, setLoginError ] = useState([]);

    const loginSubmit = async (event) => {
        event.preventDefault();
        try{
            await signInWithEmailAndPassword(authService, loginEmail, loginPassword)
            .then((userCredential) => {
                const user = userCredential.user;
            })
        } catch(error){
            setLoginError([error.code, error.message])
        }

    }

    const loginEmailChange = (event) => {
        setLoginEmail(event.target.value)
    }

    const loginPasswordChange = (event) => {
        setLoginPassword(event.target.value)
    }

    return(
        <div className='login-wrap'>
            <div className='login-container'>
                <p className='xi-twitter twitter-logo'></p>
                <h2>Login to Jinwitter</h2>
                {loginError.map((error) => {
                    return <p key={error} className='login-error'>{error}</p>
                })}
                <form onSubmit={loginSubmit}>
                    <label>
                        <input onChange={loginEmailChange} className='email' type="email" required></input>
                        <span className='email-span'>email</span>
                    </label>
                    <label>
                        <input onChange={loginPasswordChange} className='password' type="password" required />
                        <span className='pass-span'>password</span>
                    </label>
                    <input className='login' type="submit" value="Login"/>
                </form>
                <p className='sign-up'><Link to="/signUp" style={{color : "#fff", textDecoration : "none" }}>Sign up for Jinwitter</Link></p>
                <Social />
            </div>
        </div>
    )
}

export default Login;