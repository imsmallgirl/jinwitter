import React, { useEffect } from "react";
import { authService } from '../database';
import {useNavigate ,Link } from 'react-router-dom';
import styled from "styled-components";

const Header = styled.header `
    width: 10%;
    position: fixed;
    top:0;
    left:0;
    right:0;

    nav.menus { 
    height: 100vh;
    background-color: #657686;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    div.head {
    text-align: center;
    }

    p {
        text-align: center;
        line-height: 150px;
        font-size: 50px;
        color: #fff;
        margin-bottom: 30px;
        background-color: #1b99e5;
        width: 100%;
        height: 150px;
    }
    ul {
        list-style: none;
        width: 100%;
        text-align: center;
    }
    li {
        width: 100%;
        font-size: 40px;
        color: #fff;
        margin: 50px 0;
    }

    button {
        width: 100px;
        height: 30px;
        margin: 40px auto;
        border : none;
        border-radius: 50px;
        color:#fff;
        background-color: #1b99e5;
        font-size: 16px;
    }
}
`

const Navigation = ({userObj}) => {

    // logout 버튼 클릭 이벤트
    const navigate = useNavigate();
    const logOutClick = () => {
        authService.signOut()
        navigate("/", {replace: true})
    }
    
    return (
        <>
            <Header>
                <nav className="menus">
                    <div className="head">
                        <p className="xi-twitter"></p>
                        <ul>
                            <Link to="/"><li><span className="xi-home-o"/></li></Link>
                            <Link to="/profile"><li><span className="xi-user-o"/></li></Link>
                        </ul>
                    </div>
                    <button onClick={logOutClick}>Log out</button>
                </nav>
            </Header>
        </>
    )
}

export default Navigation;