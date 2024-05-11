import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLf_e-U7y6Q7EZnytdBW2BeCiEGqqv78I",
  authDomain: "kurosawa-2b596.firebaseapp.com",
  projectId: "kurosawa-2b596",
  storageBucket: "kurosawa-2b596.appspot.com",
  messagingSenderId: "58033514575",
  appId: "1:58033514575:web:cae4ee4c746d2ce122223a",
  measurementId: "G-RKZGK6QG08"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

setPersistence(auth, browserLocalPersistence)
.then(() => {
    console.log("Guardado en localStorage")
}
)
.catch((err) =>{console.error(err)})