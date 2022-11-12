import { ReactNode } from "react";
import { User, UserCredential } from "firebase/auth";

export interface IChildrenProps {
    children: ReactNode;
}

export interface IAppContext {
    currentUser: User | null; 
    logIn: (email: string, password: string) => Promise<UserCredential>; 
    signUp: (email: string, password: string) => Promise<UserCredential>; 
    logOut: () => Promise<void>;
    connectPhoto: (currentUser: User, photoURL: string) => Promise<void>;
    uploadPhoto: (file: File) => Promise<string | undefined>;
}