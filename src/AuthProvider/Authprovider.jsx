import React, { createContext, useEffect, useState,  } from 'react';
import {auth} from '../firebase/firebase.config'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from 'firebase/auth';

export const AuthContext = createContext(null)


export const Authprovider = ({children}) => {

  const [user, setUser] = useState(null)

// sign up email and password
const createEmailAndPass = (email, password)=>{
return createUserWithEmailAndPassword (auth, email, password)
}
// sign in with email and password
const signInWithPass = (email, password)=>{
  return signInWithEmailAndPassword(auth, email, password)
}

// sign out
const handleSignOut = ()=>{
  signOut(auth)
  
}
// Forget Password
 const forgetPassword = (email) => {
   return sendPasswordResetEmail(auth, email);
 };

// On Auth State change
useEffect(()=>{
 const unsubcribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user login');
      setUser(user);
    } else {
      console.log('user signout');
      setUser(null);
    }
  });
  return () => unsubcribe()
}, [])



  const authInformation = {
    user,
    createEmailAndPass,
    signInWithPass,
    handleSignOut,
    forgetPassword,
  };

  return <AuthContext value={authInformation}>
    {children}
  </AuthContext>;
};

export default Authprovider;