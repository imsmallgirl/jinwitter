import React, { useEffect, useState } from "react";
import { jinDB, storageService } from '../database';
import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, QuerySnapshot, updateDoc, where} from "firebase/firestore";
import NewJinweet from "./NewJinweet";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { updateCurrentUser } from "firebase/auth";
import { async } from "@firebase/util";


const JinweetMake = ({userObj, updateUser}) => {

    const [jinweet, setJinweet] = useState("");
    const [newJinweets, setNewJinweets] = useState([]);
    const [submitText ,setSubmitText] = useState();
    const [imageFile, setImageFile] = useState("");

    // 텍스트 상자 auto 높이 조절
    const resizeText = (event) => {
        event.target.style.height = '1px';
        event.target.style.height = (12 + event.target.scrollHeight) + 'px';
    }

    // 데이터 베이스로 글 데이터 보내기.

    const jinweetSubmit = async (event) => {
        event.preventDefault();

        let imageFileUrl = "";
        if(imageFile !== ""){
            const imageFileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(imageFileRef, imageFile, "data_url" );
            imageFileUrl = await getDownloadURL(response.ref);

            const jinweetObj = {
                text : jinweet,
                createdAt : Date.now(),
                creatorId : userObj.uid,
                creatorName : userObj.displayName,
                creatorPhoto : userObj.photoURL,
                imageFileUrl
            }

            try {
                const docRef = await addDoc(collection(jinDB, "jinweets"), jinweetObj);
                setJinweet("");
            }catch(e){
                alert(e.message)
            }
            setJinweet("");
            setSubmitText("");
            setImageFile("");
        }else{
            const jinweetObj = {
                text : jinweet,
                createdAt : Date.now(),
                creatorId : userObj.uid,
                creatorName : userObj.displayName,
                creatorPhoto : userObj.photoURL,
                imageFileUrl : ""
            }

            try {
                const docRef = await addDoc(collection(jinDB, "jinweets"), jinweetObj);
                setJinweet("");
            }catch(e){
                alert(e.message)
            }
            setJinweet("");
            setSubmitText("");
            setImageFile("");
        }
    }

    const jinweetChange = (event) => {
        const {value} = event.target;
        setJinweet(value)
        setSubmitText(value)
    }

    // 데이터 업데이트하기

    const getJinweets = async() => {
        const q = query(collection(jinDB, "jinweets"), orderBy('createdAt', 'desc'));
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
        getJinweets();
    }, [])

    // 파일 추가 이벤트

    const onFileChange = (event) => {
        const {
            target : {files}
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (findFile) => {
            const {
                currentTarget : {result}
            } = findFile
            setImageFile(result)
        }
        reader.readAsDataURL(theFile)
     }

     // 파일 취소 이벤트

     const cancleImageFile = () => {
        setImageFile("")
     }

    return (
        <section className="jinweet">
            <form onSubmit={jinweetSubmit}>
                <textarea value={submitText} onKeyDown={resizeText} onKeyUp={resizeText} onChange={jinweetChange} className="jinweet-write" type="text" placeholder='무슨 일이 일어나고 있나요?' />
                {imageFile && 
                    <div className="img-file-wrap">
                        <p><img src={imageFile} alt=""/></p>
                        <button onClick={cancleImageFile} className="xi-close-min"></button>
                    </div>
                }
                <div className="jinweet-form-btn">
                    <label className="xi-library-image-o file-label">
                        <input className="file" type="file" accept="image/*" onChange={onFileChange}/>
                    </label>

                    <input className="jinweet-btn" type="submit" value="진트윗하기"/>
                </div>
            </form>
            <div className="jinweet-contents">
                {newJinweets.map((item) => {
                    return <NewJinweet key={item.id} contentsId={item.id} createdAt={item.createdAt} contentsText={item.text} creatorName={item.creatorName} creatorPhoto={item.creatorPhoto} creatorId={item.creatorId} userObj={userObj} jinweetObj={item} imageFileUrl={item.imageFileUrl}/>
                })}

            </div>
        </section>
    )
}

export default JinweetMake;