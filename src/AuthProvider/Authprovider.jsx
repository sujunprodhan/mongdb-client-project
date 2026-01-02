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
    setLoading(true)
    return signOut(auth);
  };

  // Sign in with Google
  const signInWithGoogle = (provider) => {
    return signInWithPopup(auth, provider);
  };

  // Forget Password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Email Sent!',
          text: 'Password reset email has been sent. Check your inbox.',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      })
      .finally(() => setLoading(false));
  };

  // On Auth State change
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false)
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
   resetPassword,
    signInWithGoogle,
    loading,
    setLoading,
    
  };

  return <AuthContext value={authInformation}>{children}</AuthContext>;
};

export default Authprovider;
