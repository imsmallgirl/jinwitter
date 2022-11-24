import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { authService, githubProvider, googleProvider } from "../database";

const Social = () => {
    const [googleError, setGoogleError] = useState([]);
    const [gitHubError, setGitHubError] = useState([]);

    const [googleUser, setGoogleUser] = useState(null)
    const [gitHubUser, setGitHubUser] = useState(null)

    //google

    const googleLogin = async () => {
        await signInWithPopup(authService, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            setGoogleUser(user)
        }).catch((error) => {
            setGoogleError([error.code, error.message, error.customData.email, GoogleAuthProvider.credentialFromError(error)])
        })
    }

    //git hub

    const gitHubLogin = async () => {
        await signInWithPopup(authService, githubProvider)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            setGitHubUser(user)
        }).catch((error) => {
            setGoogleError([error.code, error.message, error.customData.email, GithubAuthProvider.credentialFromError(error)])
        })
    }

    return(
        <>
            {googleUser && (
                <Navigate to="/main" replace={true}/>
            )}
            {gitHubUser && (
                <Navigate to="/main" replace={true}/>
            )}
            <div className='social-btn'>
                <button onClick={googleLogin}><span className='xi-google'></span>Google</button>
                <button onClick={gitHubLogin}><span className='xi-github'></span>Github</button>
            </div>
            {googleError.map((error) => {
                return <p>{error}</p>
            })}
            {gitHubError.map((error) => {
                return <p>{error}</p>
            })}
        </>

    )
}

export default Social