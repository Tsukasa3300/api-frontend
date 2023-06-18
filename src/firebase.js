import { initializeApp } from "firebase/app";

// 1:getAuthをimportする
import { getAuth } from "firebase/auth";

// 2:(使用したいプロバイダ名)AuthProviderをimportする
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCAPiKRy6kghOgc_foeTEY-QDOCHzs0SNY",
  authDomain: "login-d61fc.firebaseapp.com",
  projectId: "login-d61fc",
  storageBucket: "login-d61fc.appspot.com",
  messagingSenderId: "933269398160",
  appId: "1:933269398160:web:03f7ccff02c17d23572e15",
  measurementId: "G-L3XCTZMGMV"
};

const app = initializeApp(firebaseConfig);


// 3:importした3つを宣言して、exportする
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

