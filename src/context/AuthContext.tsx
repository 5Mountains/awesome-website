import { useContext, useState, useEffect, createContext } from "react";
import { IAppContext, IChildrenProps } from "./types";
import { auth, storage } from "../firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  User, 
  UserCredential, 
  updateProfile
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AuthContext = createContext<IAppContext | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: IChildrenProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signUp = (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const logIn = (email :string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = (): Promise<void> => {
    return auth.signOut();
  };

  const uploadPhoto = async (file: File): Promise<string | undefined> => {
    const fileRef = ref(storage, `avatars/${file.name}`);
    await uploadBytes(fileRef, file);

    return getDownloadURL(fileRef);
  }

  const connectPhoto = (currentUser: User, photoURL: string): Promise<void> => {
    return updateProfile(currentUser, { photoURL });
  }

  const value: IAppContext = {
    currentUser,
    logIn,
    signUp,
    logOut,
    connectPhoto,
    uploadPhoto,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  );
}