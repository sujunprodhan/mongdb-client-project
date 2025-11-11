import React, { use } from 'react';
import { AuthContext } from '../AuthProvider/Authprovider';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { user } = use(AuthContext);
  console.log(user);

  if (user && user?.email) {

    return{ children}
  }
  return <Navigate to={'/loginpage'}></Navigate>
};

export default PrivateRoute;
