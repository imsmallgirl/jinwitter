import { async } from "@firebase/util";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { jinDB, storageService } from "../database";
import moment from 'moment';
import { deleteObject, ref } from "firebase/storage";

const NewJinweet = ({jinweetObj ,userObj, createdAt, contentsText, creatorName, creatorPhoto, contentsId, creatorId, imageFileUrl}) => {
    const [plusIsClicked, setPlusIsClicked] = useState(false);
    const [editing , setEditing] = useState(false);
    const [newJinweetText, setNewJinweetText] = useState(jinweetObj.text);

    const jinweetTextRef = doc(jinDB, "jinweets", `${jinweetObj.id}`)


    // 더보기 버튼 클릭 이벤트
    const plusBtnClick = () => {
        setPlusIsClicked((prev) => !prev)
    }

    // 트윗 삭제 이벤트
    const deleteClick = async () => {
        const deleteOk = window.confirm('글을 삭제하시겠습니까?')
        if(deleteOk){
            try{
                await deleteDoc(jinweetTextRef)
                if(jinweetObj.imageFileUrl){
                    const urlRef = ref(storageService, jinweetObj.imageFileUrl)
                    await deleteObject(urlRef)
                }
            }catch(error){
                window.alert('트윗 삭제가 실패했습니다.')
                console.log(error)
            }
        }
    }

    // textarea auto 높이 조절
    const resizeText = (event) => {
        event.target.style.height = '1px';
        event.target.style.height = (12 + event.target.scrollHeight) + 'px';
    }

    // 트윗 수정 이벤트
    const editClick = async () => {
        setEditing((prev) => !prev)
        setPlusIsClicked(false)
    }

    const editSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(jinweetTextRef, {
            text : newJinweetText,
        });
        setEditing(false)
    }

    const textEdit = async (event) => {
        const {target : {value}} = event;
        setNewJinweetText(value)
    }

    const closeEditing = () => {
        setEditing(false);
    }

    return (
        <>
        {editing ? (
            <div className="content">
                <div className="contents-userimg-wrap">
                    <p className="contents-userimg"><img src={creatorPhoto} alt={contentsId} /></p>
                </div>
                <dl>
                    <dt className="contents-userid">
                        {creatorName}
                        {creatorId === userObj.uid && (
                            <div className="edit">
                                <button className="xi-ellipsis-h" onClick={plusBtnClick} />
                                {plusIsClicked ? (
                                <ul>
                                    <li onClick={editClick}>수정 취소하기</li>
                                    <li onClick={deleteClick}>삭제하기</li>
                                </ul>
                                ) : null}

                            </div>
                        )}
                    </dt>
                    <dd className="edit-form">
                        <form onSubmit={editSubmit}>
                            <textarea onKeyDown={resizeText} onKeyUp={resizeText}  onChange={textEdit} value={newJinweetText}/>
                            <div className="edit-form-btns">
                                <button onClick={closeEditing} className="xi-close-circle-o" />
                                <button type="submit" className="xi-check-circle-o"/>
                            </div>
                        </form>
                    </dd>
                    {imageFileUrl === "" ? (null) : 
                    (<dd className="contents-img"><img src={imageFileUrl} alt={userObj.uid} /></dd>)}

                    <dd className="contents-time">{moment(createdAt).fromNow()}</dd>
                </dl>
            </div>
        ) : (
            <div className="content">
                <div className="contents-userimg-wrap">
                    <p className="contents-userimg"><img src={creatorPhoto} alt={contentsId} /></p>
                </div>
                <dl>
                    <dt className="contents-userid">
                        {creatorName}
                        {creatorId === userObj.uid && (
                            <div className="edit">
                                <button className="xi-ellipsis-h" onClick={plusBtnClick} />
                                {plusIsClicked ? (
                                <ul>
                                    <li onClick={editClick}>수정하기</li>
                                    <li onClick={deleteClick}>삭제하기</li>
                                </ul>
                                ) : null}

                            </div>
                        )}
                    </dt>
                    <dd className="contents-text">
                        {contentsText}
                    </dd>
                    {imageFileUrl === "" ? (null) : 
                    (<dd className="contents-img"><img src={imageFileUrl} alt={userObj.uid} /></dd>)}
                    <dd className="contents-time">{moment(createdAt).fromNow()}</dd>
                </dl>
            </div>
        )}
        </>
    )
}

export default NewJinweet;