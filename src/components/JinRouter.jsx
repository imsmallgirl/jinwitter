import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../routes/Home";
import Main from "../routes/Main";
import Profile from "../routes/Profile";
import SignUp from "../routes/SignUp";

const JinRouter = ({updateUser ,isLoggedIn, userObj}) => {

    return (
        <Router>
            <Routes>
                {isLoggedIn ? 
                (
                    <>
                        <Route path="/" element={<Main isLoggedIn={isLoggedIn} userObj={userObj} updateUser={updateUser} />} />
                        <Route path="/profile" element={<Profile updateUser={updateUser} userObj={userObj}/>}/>
                    </>

                )
                 : (
                    <>
                    <Route path="/" element={<Home />}/>
                    <Route path="/signUp" element={<SignUp />} />
                    </>
                )}
            </Routes>
        </Router>

    )
}

export default JinRouter;
