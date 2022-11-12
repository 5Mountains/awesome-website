import { useState, SyntheticEvent, CSSProperties, useRef, ChangeEvent } from 'react'
import { Button, Grid, TextField, Alert, Avatar } from '@mui/material'
import { Link, useNavigate } from "react-router-dom";
import { IUserData } from './types';
import { styles } from './styles';
import { checkAvatarValidity } from './helpers';
import { useAuth } from '../../context/AuthContext';  

const BASE_USER_DATA: IUserData = {email: '', password: '', confirmPassword: ''};

export const SignUp = (): JSX.Element => {
  const { signUp, uploadPhoto, connectPhoto } = useAuth()!;
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>(BASE_USER_DATA);
  const [error, setError] = useState<string>('');
  const [avatar, setAvatar] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
      const fileObj = event.target.files?.[0];
      if (!fileObj) return;
  
      const isAvatarValid = checkAvatarValidity(fileObj.name);
      if (!isAvatarValid) {
        return setError('File does not fit for avatar purpose. Choose another one!')
      }

      try {
        setLoading(true);
  
        const avatarUrl = await uploadPhoto(fileObj);
        if (avatarUrl) {
          setAvatar(avatarUrl);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
  };

  const handleOnSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const { email, password, confirmPassword } = userData;

    if (error) {
      setError('')
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match')
    }

    try {
      setLoading(true);

      const user = await signUp(email, password);
      if (avatar) {
        await connectPhoto(user.user, avatar);
      }
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
        <h2 style={styles.title}>Create user</h2>
        {error && <Alert severity="error">{error}</Alert>}
        <div style={styles.avatarContainer as CSSProperties}>
            <Avatar src={avatar || ''} alt='User avatar' style={styles.avatar} />
            <input
              style={{display: 'none'}}
              ref={inputRef}
              type="file"
              onChange={handleFileChange}
            />
            <Button 
              disabled={loading} 
              style={styles.avatarBtn} 
              variant='outlined' 
              onClick={handleClick}
            >
              Add avatar
            </Button>
        </div>
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
          <TextField 
              required 
              margin="dense" 
              variant="outlined" 
              label="Confirm Password" 
              type="password" 
              value={userData.confirmPassword} 
              onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
          />
          <Button disabled={loading} type='submit' style={styles.submitBtn} variant='outlined'>Sign Up</Button>
        </form>
      <div>Do you already have a user? <Link to={'/login'}>Log In</Link></div>
    </Grid>
  )
}
