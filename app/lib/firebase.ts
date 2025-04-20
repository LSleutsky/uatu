import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6cmo6jwqfMx_rTn_qq6anPt0wRKWGBDc",
  authDomain: "uatu-b796f.firebaseapp.com",
  projectId: "uatu-b796f",
  storageBucket: "uatu-b796f.firebasestorage.app",
  messagingSenderId: "896972998019",
  appId: "1:896972998019:web:526d6af14c9c096c7fa2b6",
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
