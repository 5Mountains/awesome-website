import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth, updateProfile, User } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, UploadResult } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const storage = getStorage(app);


export const uploadPhoto = async (file: File): Promise<string | undefined> => {
    const fileRef = ref(storage, `avatars/${file.name}`);

    try {
        await uploadBytes(fileRef, file);
        const photoURL: string = await getDownloadURL(fileRef);

        if (photoURL) {
            return photoURL
        }
    } catch (error) {
        console.error(error)
    }
}

export const connectPhoto = async (currentUser: User, photoURL: string): Promise<void> => {
    try {
        await updateProfile(currentUser, { photoURL });
    } catch (error) {
        console.error(error);
    }
}