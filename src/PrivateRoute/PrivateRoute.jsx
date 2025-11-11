import React, { use } from 'react';
import { AuthContext } from '../AuthProvider/Authprovider';
import { Navigate } from 'react-router';
import Loading from '../Pages/My ProPertise/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
   if (loading) {
     return <Loading/>;
   }

  if (user && user?.email) {

    return children
  }
  return <Navigate to={'/loginpage'}></Navigate>
};

export default PrivateRoute;
