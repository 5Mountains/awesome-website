import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from "./../../firebase";
import { Alert, Avatar, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styles } from './styles';

export const Profile = (): JSX.Element => {  
  const [error, setError] = useState('');

  const user: User = auth.currentUser!;
  const {email, photoURL} = user;

  const navigate = useNavigate();

  const handleLogOut = async () => {
    if (error) {
      setError('');
    }
    
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      setError(`Error occur during log out: ${error}`);
    }
  }

  return (
    <Grid
      style={styles.root} 
      container 
      direction="column" 
      justifyContent="center" 
      alignItems="center"
    >
      <h2 style={styles.title}>User profile</h2>
      {error && <Alert severity="error">{error}</Alert>}
      <Avatar src={photoURL || ''} alt='User avatar' style={styles.avatar} />
      <div>Email: <strong>{email}</strong></div>
      <Button 
        style={styles.logOutBtn} 
        variant="outlined"
        onClick={handleLogOut}
      >
        Log Out
      </Button>
    </Grid>
  );
}
