
import React from 'react';
import '../css/home.css'
import JinweetMake from "../components/JinweetMake";
import Navigation from '../components/Navigation';
import styled from 'styled-components';
import UserInfo from '../components/UserInfo';

export const Wrap = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
`

export const MainWrap = styled.main`

    position: relative;
    left: 10%;
    width: 90%;

    .userInfoWrap {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 150px;
        padding:0px 40px;
        border-bottom: 1px solid #ddd;
        background-color: #fff;
    }

    .user-name {
        font-size: 20px;
        color: #666;
        font-weight: bold;
        margin-right: 20px;
    }

    .user-photo {
        width: 55px;
        height: 55px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 20px;
        border: 2px solid #1b99e5;
    }
    .user-photo img{
        width: 100%;
        height: 100%;
    }
`

const Main = ({userObj , updateUser}) => {
    
    return (
            <Wrap>
                <Navigation userObj={userObj}/>
                <MainWrap>
                    <UserInfo userObj={userObj}/>
                    <JinweetMake userObj={userObj} updateUser={updateUser}/>
                </MainWrap>
            </Wrap>  
    )
}

export default Main;