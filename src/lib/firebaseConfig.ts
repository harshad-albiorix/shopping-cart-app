
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBi--p2oHTVOaQ1RgNdR18I4I5y8A0FaSs",
    authDomain: "nest-js-learning-application.firebaseapp.com",
    databaseURL: "https://nest-js-learning-application-default-rtdb.firebaseio.com",
    projectId: "nest-js-learning-application",
    storageBucket: "nest-js-learning-application.firebasestorage.app",
    messagingSenderId: "365605267702",
    appId: "1:365605267702:web:fa400452045b5f399ca4d7",
    measurementId: "G-X67P0L6RL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

interface LoginWithEmailPayload {
    email: string;
    password: string;
}

export const loginWithEmail = async ({ email, password }: LoginWithEmailPayload) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        return token;
    } catch (error) {
        throw error;
    }
};


