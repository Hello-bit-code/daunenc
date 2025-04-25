// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwTkzZk57TTUCZCmfhxm34LmAegjCCvB0",
  authDomain: "daunencbus.firebaseapp.com",
  projectId: "daunencbus",
  storageBucket: "daunencbus.appspot.com",
  messagingSenderId: "595759657982",
  appId: "1:595759657982:web:6e11609c1b898ad33dc6af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 탑승자 수를 Firestore에 저장하는 함수
function submitPassengerCount() {
  const passengerCount = document.getElementById('passengerCount').value;
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  setDoc(doc(db, "passengers", currentDate), {
    count: passengerCount,
  }).then(() => {
    alert("탑승자 수가 저장되었습니다.");
  }).catch((error) => {
    console.error("Error adding document: ", error);
  });
}

// 기사용 비밀번호 확인 후 탑승자 수 조회하는 함수
function checkDriverPassword() {
  const password = document.getElementById('driverPassword').value;

  if (password === "4737") {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const docRef = doc(db, "passengers", currentDate);

    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        document.getElementById('driverInfo').innerHTML = `오늘의 탑승자 수: ${docSnap.data().count}`;
      } else {
        document.getElementById('driverInfo').innerHTML = "탑승자 수 정보가 없습니다.";
      }
    });
  } else {
    alert("잘못된 비밀번호입니다.");
  }
}
