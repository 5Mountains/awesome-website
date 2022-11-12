import { useState } from 'react';
import { Alert, Avatar, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';  
import { styles } from './styles';

export const Profile = (): JSX.Element => { 
  const { currentUser, logOut } = useAuth()!; 
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {email, photoURL} = currentUser!;

  const handleLogOut = async () => {
    if (error) {
      setError('');
    }
    
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
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
