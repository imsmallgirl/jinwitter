import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "../components/Navigation";
import ProfileEdit from "../components/ProfileEdit";
import UserInfo from "../components/UserInfo";
import { jinDB } from "../database";
import { MainWrap, Wrap } from "./Main";

const ProfileInfo = styled.section`
    padding: 30px;
    .profile-info {
        position: relative;
        width: 30%;
        background-color: #fff;
        border: 1px solid #ddd;
    }
    .profile-bg {
        width: 100%;
        height: 200px;
        background-color: #333;
    }
    .profile-create{
        padding: 15px 20px;
        color: #666;
        display: flex;
        align-items: center;
        span{
            font-size: 20px;
            margin-right: 10px;
        }
    }
`

const ProfileInfoHead = styled.dl`
    display: flex;
    justify-content: flex-end;
    position: relative;
    dt {
        width: 100px;
        height: 100px;
        position: absolute;
        top:-15%;
        left: 30px;
        transform: translateY(-50%);
        border-radius: 50%;
        border: 3px solid #fff;
        overflow: hidden;
    }
    img {
        width: 100%;
        height: 100%;
    }

    dd{
        padding: 15px 20px;
    }
    button {
        border: none;
        background-color: transparent;
        padding: 8px 15px;
        border: 1px solid #aaa;
        border-radius: 30px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
    }
`

const ProfileInfoContents = styled.dl`
    padding: 15px 20px;
    dt {
        font-size: 24px;
        font-weight : bold;
        color: #333;
        margin-bottom: 5px;
    }
    dd {
        color: #666;
    }
`

const Profile = ({updateUser ,userObj}) => {
    const [profileEditing, setProfileEditing] = useState(false)
    const [newName , setNewName ] = useState(userObj.displayName)

    const profileEditClick = () => {
        setProfileEditing(prev => !prev)
    }

    // //바뀐 데이터 업데이트
    //     const getMyNweets = async () => {
    //         const q = query(
    //             collection(jinDB, "jinweets"),
    //             where("creatorId", "==", userObj.uid),
    //             orderBy("createdAt", "desc")
    //         );
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //             console.log(doc.id, "=>", doc.data())
    //         })
    //     }
    
    //     useEffect(() => {
    //         getMyNweets()
    //     }, [])

    return(
        <Wrap>
            <Navigation />
            <MainWrap>
                <UserInfo userObj={userObj}/>
                <ProfileInfo>
                    <div className="profile-info">
                        <p className="profile-bg"></p>
                        <ProfileInfoHead>
                            <dt><img src={userObj.photoURL} alt="" /></dt>
                            <dd><button onClick={profileEditClick}>Edit Profile</button></dd>
                        </ProfileInfoHead>
                        <ProfileInfoContents>
                            <dt>{userObj.displayName}</dt>
                            <dd>@{userObj.email.split('@')[0]}</dd>
                        </ProfileInfoContents>
                        <p className="profile-create"><span className="xi-calendar" />Joined {userObj.metadata.creationTime.split(' ').slice(0,4).join(' ')}</p>
                    </div>
                </ProfileInfo>
            </MainWrap>
            {profileEditing ? (
                    <ProfileEdit updateUser={updateUser} profileEditing={profileEditClick} userObj={userObj} setNewName={setNewName} newName={newName}/>
                ) : (null)}
        </Wrap>
    )
}

export default Profile;