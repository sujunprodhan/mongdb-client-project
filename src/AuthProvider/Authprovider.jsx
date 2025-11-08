import React, { createContext } from 'react';


export const AuthContext = createContext(null)


export const Authprovider = ({children}) => {

// sign up email and password

const createEmailAndPass = ()=>{


}



  const authInformation = {
    createEmailAndPass,
  };

  return <AuthContext value={authInformation}>
    {children}
  </AuthContext>;
};

export default Authprovider;