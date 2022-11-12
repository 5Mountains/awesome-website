import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';  
import { IChildrenProps } from './types';

export const PrivateRoute = ({ children }: IChildrenProps) => {
    const { currentUser } = useAuth()!; 
    
    if (!currentUser) {
        return <Navigate to="/login" />
    }

    return (
        <>
            {children}
        </>
    )
}
