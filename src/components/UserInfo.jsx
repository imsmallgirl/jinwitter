import React from "react";
import styled from "styled-components";

const UserInfo = ({userObj}) => {
    return(
        <nav className='userInfoWrap'>
            <p className="user-name">{userObj.displayName} 님</p>
            <p className="user-photo"><img src={userObj.photoURL} alt={userObj.uid} /></p>
        </nav>
    )
}

export default UserInfo;