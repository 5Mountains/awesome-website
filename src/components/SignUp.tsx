import React, { useState, SyntheticEvent } from 'react'
import { Button, Grid, TextField, Alert } from '@mui/material'
import { Link, useNavigate } from "react-router-dom";

export interface IUserData {
    email: string;
    password: string;
}

export const SignUp = (): JSX.Element => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>({email: '', password: ''});
  const [error, setError] = useState<string>('')

  const handleOnSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData.email, userData.password);

    navigate('/');

    setUserData({email: '', password: ''});
  }

  return (
    <Grid style={{ height: '100vh' }} container direction="column" justifyContent="center" alignItems="center">
        <h2>Create user</h2>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleOnSubmit}>
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
            <TextField 
                required 
                margin="dense" 
                variant="outlined" 
                label="Confirm Password" 
                type="password" 
                value={userData.password} 
                onChange={(e) => setUserData({...userData, password: e.target.value})}
            />
            <Button type='submit' style={{ margin: '10px 0' }} variant='outlined'>Sign Up</Button>
        </form>
        <div>Do you already have a user? <Link to={'/login'}>Log In</Link></div>
    </Grid>
  )
}
