import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { authService } from "../database";
import JinRouter from "./JinRouter";

function App() {
  const [init , setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null)

  // 로그인 상태 확인 and 유지
  useEffect(() => {
    onAuthStateChanged(authService , (user) => {
      if(user){
        if(user.displayName === null){
          updateProfile(authService.currentUser, {
            displayName : user.email
          })
        }
        if(user.photoURL === null || user.photoURL === ""){
          updateProfile(authService.currentUser, {
            photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPPK_2b6FgRks2-UOD-Hfp2Eyqpib7XW4pjDnJK-2Mgg&s"
          })
        }
        setUserObj(user)
        setIsLoggedIn(true);
      }else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  // 프로필 업데이트된 유저 정보

  const updateUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(
        user, {
          displayName : user.displayName,
          ...args
        },
      )
    })
  }

  return (
    <div className="App">
      {init ? <JinRouter updateUser={updateUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : "로딩중..."}
    </div>
  );
}

export default App;
