import React, { useState, SyntheticEvent, CSSProperties } from 'react';
import { Button, Grid, TextField, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { IUserData } from './types';
import { styles } from './styles';

const BASE_USER_DATA = {email: '', password: ''};

export const LogIn = (): JSX.Element => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>(BASE_USER_DATA);
  const [error, setError] = useState<string>('')

  const handleOnSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (error) {
      setError('')
    }

    signInWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (user) {
        navigate('/');
      }

      setUserData(BASE_USER_DATA);
    })
    .catch((error) => {
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    })
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
