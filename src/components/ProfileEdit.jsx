import { uuidv4 } from "@firebase/util";
import { updateProfile } from "firebase/auth";
import { collection, doc, getDocs, onSnapshot, orderBy, query, QuerySnapshot, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { authService, jinDB, storageService } from "../database";

const ProfileEditWrap = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
    color: #333; 
    form{
        width: 500px;
        height: 500px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        z-index: 30;
        background-color: #fff;
        padding: 20px;
        border-radius: 20px;
        overflow: hidden;
    }

`

const UserEditHead = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #fff;

    dl{
        display: flex;
        align-items: center;
    }
    dt{
        margin-right: 20px;
        .edit-cancel {
            font-size: 22px;
            background-color: transparent;
            border: none;
            cursor: pointer;
        }    
    }
    dd {
        font-size: 20px;
        font-weight: bold;
        color: #333;  
    }
    input{
        background-color: #1b99e5;
        border: none;
        padding: 10px 15px;
        font-size: 16px;
        font-weight: bold;
        color:#fff;
        border-radius: 20px;
        cursor: pointer;
        transition: .3s;
    }
    input:hover {
        background-color: rgba(27, 153, 229, 0.7);
    }
`

const UserEditContents = styled.div`

    margin-top: 30px;
    .userPhotoEdit {
        position: relative;
        border-radius: 50%;
        overflow: hidden;
        width: 120px;
        height: 120px;
        img{
            width: 100%;
            height: 100%;
        }
        label {
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            width: 50px;
            height: 50px;
            background-color: rgba(0,0,0,0.3);
            border-radius: 50%;
            text-align: center;
            line-height: 50px;
            font-size: 30px;
            color:#fff;
            cursor: pointer;
        }
        input{
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip:rect(0,0,0,0);
            border: 0;
        }
    }
    
    .userNameEdit {
        position: relative;
        margin-top: 20px;
        width: 100%;
        label{
            width: 100%;
            .edit-name{
                position: absolute;
                top: 10px;
                left: 10px;
                font-size: 14px;
                color:#999;
            }

        }

        .profile-name {
            width: 100%;
            padding: 40px 10px 10px 10px;
            font-size: 20px;
            border: none;
            border : 1px solid #ddd;
            border-radius: 10px;
            outline: none;
            transition: all .3s;
        }
        .profile-name:focus {
            border-color:#1b99e5;
        }

        .profile-name:focus + .edit-name{
            color: #1b99e5;
        }
    }
`

const ProfileEdit = ({updateUser ,userObj, profileEditing ,setNewName, newName}) => {
    const [userPhoto, setUserPhoto] = useState(userObj.photoURL);
    const [newJinweets, setNewJinweets] = useState([]);

    // 편집 창 닫기 버튼
    const editCancelEvent = () => {
        profileEditing()
    }

    // 이름 바꾸는 이벤트
    const editNameChange = (event) => {
        setNewName(event.target.value);
    }

    const profileEditSubmit = async(event) => {
        event.preventDefault();

        // 프로필 이름 업데이트
        if(userObj.displayName !== newName){
            await updateProfile(authService.currentUser, {
                displayName: newName
            })
        }

        // 프로필 이미지 업데이트
        let userPhotoUrl = "";
        if(userObj.photoURL !== userPhoto){
            const userPhotoRef = ref(storageService, `${userObj.uid}/${uuidv4()}/userProfilePhoto`)
            const response = await uploadString(userPhotoRef, userPhoto, "data_url");
            userPhotoUrl = await getDownloadURL(response.ref);

            await updateProfile(authService.currentUser, {
                photoURL : userPhotoUrl
            })
        }

        newJinweets.forEach( async (item) => {
            const jinweetsRef = doc(jinDB, "jinweets", `${item.id}`);

            await updateDoc(jinweetsRef, {
                creatorName : userObj.displayName,
                creatorPhoto : userObj.photoURL
            })
        })


        // 프로필 편집 창 닫기
        profileEditing()
    }

    // 바뀐 유저 정보 트윗 데이터 업데이트

    const getNewJinweets = async () => {
        const q = query(collection(jinDB, "jinweets"),where("creatorId", "==", userObj.uid), orderBy('createdAt', 'desc'));
        onSnapshot(q, (snapshot) => {
            const jinweetArr = snapshot.docs.map((doc) => (
                {
                id : doc.id,
                ...doc.data()
            }));
            setNewJinweets(jinweetArr)
        });
    }

    useEffect(() => {
        getNewJinweets()
    }, [])
    // 유저 프로필 이미지 바꾸는 이벤트

    const userPhotoChange = (event) => {
        const {
            target : {files}
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (findFile) => {
            const {
                currentTarget : {result}
            } = findFile
            setUserPhoto(result)
        }
        reader.readAsDataURL(theFile)

    }
    return(
            <ProfileEditWrap>
                <form onSubmit={profileEditSubmit}>
                    <UserEditHead>
                        <dl>
                            <dt><button className="xi-close edit-cancel" onClick={editCancelEvent} /></dt>
                            <dd onClick={editCancelEvent}>Edit Profile</dd>
                        </dl>
                        <input type="submit" value="Save"/>
                    </UserEditHead>
                    <UserEditContents>
                        <div className="userPhotoEdit">
                            <img src={userPhoto} alt="" />
                            <label className="xi-camera-o">
                                <input type="file" accept="image/*" onChange={userPhotoChange} />
                            </label>
                        </div>
                        <div className="userNameEdit">
                            <label>
                                <span className="edit-name">Name</span>
                                <input className="profile-name" type="text" value={newName} onChange={editNameChange}/>
                            </label>
                        </div>

                    </UserEditContents>
                </form>
            </ProfileEditWrap>
    )
}

export default ProfileEdit;