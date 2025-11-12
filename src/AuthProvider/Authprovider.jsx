import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
} from 'firebase/auth';

export const AuthContext = createContext(null);

export const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


 
  

  // sign up email and password
  const createEmailAndPass = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign in with email and password
  const signInWithPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign out
  const handleSignOut = () => {
    return signOut(auth);
  };

  // Sign in with Google
  const signInWithGoogle = (provider) => {
    return signInWithPopup(auth, provider);
  };

  // Forget Password
  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // On Auth State change
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    
    return () => unsubcribe();
  }, []);

  const authInformation = {
    user,
    createEmailAndPass,
    signInWithPass,
    handleSignOut,
    forgetPassword,
    signInWithGoogle,
    loading,
    setLoading,
  };

  return <AuthContext value={authInformation}>{children}</AuthContext>;
};

export default Authprovider;
