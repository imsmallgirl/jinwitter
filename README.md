![header](https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=300&section=header&text=Jinwitter&fontSize=90)

## :information_desk_person:&nbsp;  Demo Site
* [https://imsmallgirl.github.io/jinwitter/](https://imsmallgirl.github.io/jinwitter/)

### :books:&nbsp; 사용 언어
<!-- 주석 -->
<img src="https://img.shields.io/badge/HTML5-EC6231?style=flat-square&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-3795ce?style=flat-square&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/JAVASCRIPT-f8c327?style=flat-square&logo=javascript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<!-- 주석 -->
### :mag_right:&nbsp; 사용 스킬
<!-- 주석 -->
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white"/> <img  src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/> <img src="https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=ReactRouter&logoColor=white"/>
<!-- 주석 -->
---

### :bookmark_tabs:&nbsp;&nbsp; 기능 설명

> Sign up

* email + password 회원가입 기능
  - ![ezgif com-gif-maker (8)](https://user-images.githubusercontent.com/108922353/205555268-9a4cd445-179b-43a2-82db-1a879c0fb4db.gif)

  - createUserWithEmailAndPassword()를 사용함
  - 유저가 회원가입하면서 오류가 발생한 경우 오류 메세지를 보여주도록 함.
    - ![ezgif com-gif-maker (9)](https://user-images.githubusercontent.com/108922353/205555639-dd257828-c11e-4278-9637-6e2ef279287d.gif)
    
> Login

![ezgif com-gif-maker (10)](https://user-images.githubusercontent.com/108922353/205556402-1807cdad-d07f-494e-8174-cd2eedfd2ea4.gif)

* email + password 로그인 가능하게 구현

  - firebase 의 Authentication를 사용
  - signInWitchEmailAndPassword() 를 사용

* social login

  - firebase의 signInWithPopup()을 사용함.
  - firebase의 데이터를 받아오는 jsx (database.jsx) 에서 googleProvider와, githubProvider를 import 해왔음.

* login error
  
  - try,catch 를 사용해 사용자의 로그인에 오류가 발생 시, 오류 메세지를 보여주도록 함.
  ![ezgif com-gif-maker (7)](https://user-images.githubusercontent.com/108922353/205553582-43f4eea5-b41f-43fb-b3ac-b22caf137415.gif)
  
* login success

  - 로그인 상태 확인 & 유지
    - onAuthStateChanged()를 사용함
    - 유저가 로그인 한 상태인지 로그아웃한 상태인지 확인함.
    - 로그인 상태라면 로그아웃하기 전에는 login 페이지로 갈 수 없도록 함.
    - 로그인 상태라면 Main 페이지로 갈 수 있도록 Route를 사용함.
    
    
> 글 올리기

  ![ezgif com-gif-maker (11)](https://user-images.githubusercontent.com/108922353/205557654-f5a8a7e3-7ac0-4d54-b1cb-529e05b17e10.gif)

* firebase의 Firestore Database 를 사용함
  
  - database.jsx에서 Firestore의 데이터를 갖고와줌.
  
  ```
  export const jinDB = getFirestore(app);
  ```
  
  - 데이터 정보 FireStore에게 보내주기
  
    - text
    - 글 작성 시간
    - 글 작성자 아이디
    - 글 작성자 이름
    - 글 작성자 프로필 사진
    - 이미지 파일 주소
    
  - 이미지 파일 업로드
    
    - 이미지 미리보기 기능
    - 이미지 업로드 취소 기능
    - ![ezgif com-gif-maker (12)](https://user-images.githubusercontent.com/108922353/205557975-cdd24599-6667-4eaf-9e95-3d4ee840a179.gif)


> 글 업데이트

* firestore 에서 데이터 갖고오기
  
  - onSnapshot() 을 사용해서, 글 id 와 글의 데이터들을 가져옴.
  - newJinweets 라는 useState에 글 데이터들을 모두 넣어줌.
  - 데이터가 업데이트될 때만 갖고오도록 해서, useEffect() 를 사용함.

* 사용자들에게 글 데이터들 보여주기

  - 데이터를 저장한 newJinweets 를 map() 함수를 통해 ui에 보여주는 작업함.
  

> 글 수정 & 삭제

* 수정 & 삭제 권한
  
  - 글 데이터의 작성자 id 와 현재 접속해있는 유저의 id 와 같을 경우에만 삭제와 수정 버튼이 보이도록 함.
  - ```
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
      ```

* 글 삭제

  - 삭제하기 버튼을 클릭 시, window.confirm 창이 나오며, 삭제 여부를 사용자에게 물어봄.
  
    - ![ezgif com-gif-maker (13)](https://user-images.githubusercontent.com/108922353/205560823-ac42cc85-3d4c-452e-8ba0-ea9397c429fe.gif)

  - 삭제 성공
  
    - firestore에 있는 데이터를 삭제함.
    - ui 에서도 사라지게 업데이트를 해줌.
    
  - 삭제 실패
  
    - window.alert 를 사용해, 삭제에 실패했다고 알려줌.
    
* 글 수정

  - 수정하기 버튼을 클릭 시, 텍스트 자리에 edit 화면이 보이도록 함.
  
    - ![ezgif com-gif-maker (14)](https://user-images.githubusercontent.com/108922353/205561404-75e47c0a-ae44-4386-8a40-dce241371946.gif)
    
  - 수정하기 취소 버튼
    
    - 수정하기 취소를 클릭하면, 데이터가 변하지않고 원래 데이터를 보여줍니다.
    - ![ezgif com-gif-maker (16)](https://user-images.githubusercontent.com/108922353/205561780-038cbd3b-4ca7-4159-a444-9125589cfed3.gif)

  
  - 수정하기 완료 버튼
  
    - 수정하기 완료 버튼을 클릭하면, 변한 데이터를 firestore로 전송해, 다시 데이터를 업데이트 해줍니다.
    - ![ezgif com-gif-maker (15)](https://user-images.githubusercontent.com/108922353/205561580-6847b3ae-3034-4234-866c-79fbad7571ba.gif)


> 프로필

* 프로필 확인
  
  - 유저의 프로필 정보를 확인할 수 있습니다.
    
    - 현재 프로필 사진
    - 프로필 이름
    - 이메일 아이디
    - 회원가입 날짜
    - ![스크린샷 2022-12-05 오후 3 13 44](https://user-images.githubusercontent.com/108922353/205562271-d340b4d7-7c30-400f-a778-12881fd65226.png)

* 프로필 수정

  - Edit Profile 버튼 클릭시, 모달 창으로 edit 화면이 나올 수 있도록 함.
    
    - ![ezgif com-gif-maker (17)](https://user-images.githubusercontent.com/108922353/205562449-16e4226c-b134-4449-867b-f9f2c7bfb6f8.gif)

  - 프로필 이미지 변경
    
    - 프로필 이미지를 변경한 url 을 user 프로필 이미지 데이터로 전송함.
    - 이전의 작성한 모든 글의 프로필 이미지를 업데이트함.
    - ![ezgif com-gif-maker (18)](https://user-images.githubusercontent.com/108922353/205562811-3888b755-c70b-418f-aeaf-232a6a227534.gif)

  - 프로필 이름 변경
    
    - 프로필 이름을 변경한 value 를 user 프로필 이름 데이터로 전송함.
    - 이전의 작성한 모든 글의 프로필 이름을 업데이트함.
    - ![ezgif com-gif-maker (19)](https://user-images.githubusercontent.com/108922353/205563073-30e91f3d-5158-41a6-82f4-1e8a11c7054d.gif)


> Log out

* 로그아웃 버튼을 클릭 시, 현재 로그인 상태가 로그아웃으로 바뀌며 login 페이지로 이동하게 함.
  
  - ![ezgif com-gif-maker (20)](https://user-images.githubusercontent.com/108922353/205564184-ec7b2964-df42-4e00-9bfa-f602e37a63a0.gif)



  
    


  
