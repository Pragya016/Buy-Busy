import React, { useState } from 'react'
import { Alert, Button, TextField } from '@mui/material'
import styles from './css/form.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { signInUser, signUpUser } from '../database/auth';
import { useAuthContext } from '../context/auth.context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
export default function Form({data}) {
  
  const { heading, isSigninPage } = data;
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [alert, setAlert] = useState({ status: '', message: '' });
  const navigate = useNavigate();
  const  {currentUser, isLoggedIn}  = useAuthContext();

  async function handleFormSubmission(e) {
    e.preventDefault();

    try {
      if(isSigninPage) {
        await signInUser(formData)
        navigate('/');
      }
      else {
        await signUpUser(formData)
        console.log(formData)
        navigate('/sign-in')
      } 
      console.log(isLoggedIn, currentUser)
    } catch (error) {
      // setAlert({ status: 'error', message: 'Something went wrong' });
      toast.error('Something went wrong', {
        closeOnClick: true,
        pauseOnHover: true,})
    }
  }

  function handleChangeInput(e) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  }

  function handleFocusInput() {
    setAlert({ status: '', message: '' });
  }

    return (
    <div id={styles.formContainer}>
        <form id={styles.form} onSubmit={handleFormSubmission}>
          <div id={styles.topContainer}>
            <h1 id={styles.heading}>{heading}</h1>
            {alert.status === 'error' && <Alert severity='error' id={styles.alert}>{ alert.message}</Alert>}
          {!isSigninPage && <TextField onChange={handleChangeInput} onFocus={handleFocusInput} id="standard-basic" label="Name" variant="standard" name='name' style={{width : '70%', marginBottom:'15px'}} required/>}
          <TextField onChange={handleChangeInput} onFocus={handleFocusInput} type='email' id="standard-basic" label="Email" name='email' variant="standard" style={{width : '70%', marginBottom:'15px'}} required/>
            <TextField onChange={handleChangeInput} onFocus={handleFocusInput} id="standard-basic" type='password' label="Password" name='password' variant="standard" style={{ width: '70%' }} required />
            <Button id={styles.submitBtn} type='submit' variant='contained'>{ isSigninPage ? 'Sign In' : 'Sign Up'}</Button>  
          </div>
          <div>
          {isSigninPage ? 
            <p id={styles.text}>Don't have an account? <Link to='/sign-up'>Create account</Link></p> :
            <p id={styles.text}>Already Have an account? <Link to='/sign-in'>Sign In</Link></p> 
            }
          </div>
        </form>
        <ToastContainer/>
    </div>
  )
}
