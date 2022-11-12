import { useState, SyntheticEvent, CSSProperties } from 'react';
import { Button, Grid, TextField, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { IUserData } from './types';
import { styles } from './styles';
import { useAuth } from '../../context/AuthContext';  


const BASE_USER_DATA: IUserData = {email: '', password: ''};

export const LogIn = (): JSX.Element => {
  const { logIn } = useAuth()!;
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>(BASE_USER_DATA);
  const [error, setError] = useState<string>('');

  const handleOnSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (error) setError('')
    
    try {
      await logIn(userData.email, userData.password);
      navigate('/');
      setUserData(BASE_USER_DATA);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
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
        <h2 style={styles.title}>Log In</h2>
        {error && <Alert severity="error">{error}</Alert>}
        <form style={styles.form as CSSProperties} onSubmit={handleOnSubmit}>
            <TextField 
                required 
                margin="dense" 
                variant="outlined"
                label="Email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
            />
            <TextField 
                required 
                margin="dense" 
                variant="outlined" 
                label="Password" 
                type="password"
                value={userData.password} 
                onChange={(e) => setUserData({...userData, password: e.target.value})}
            />
            <Button disabled={loading} type='submit' style={styles.submitBtn} variant='outlined'>Log In</Button>
        </form>
        <div>Do not have an account? <Link to={'/signup'}>Sign Up</Link></div>
    </Grid>
  )
}
