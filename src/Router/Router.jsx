import { createBrowserRouter } from 'react-router';
import Layout from '../MainLayout/Layout';
import AllProducts from '../Pages/AllPropetise';
import Profile from '../Pages/Profile';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import Home from '../Pages/Home';
import Reset from '../Componets/Reset';
import ErrorPage from '../Componets/ErrorPage';
import PropertyDetails from '../Pages/PropertyDetails';
import MyRatings from '../Componets/MyRatings';
import AllPropertise from '../Pages/AllPropetise';
import AddPropertise from '../Pages/Add Propertise/AddPropertise';
import MyPropertise from '../Pages/My ProPertise/MyPropertise';
import LatestProperty from '../Pages/LatestProperty/LatestProperty';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import UpdateProperties from '../Pages/UpdateProperties';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('http://localhost:3000/latestproperty'),
      },
      {
        path: '/allpropertise',
        element: <AllPropertise />,
        loader: () => fetch('http://localhost:3000/realagent'),
      },
      {
        path: '/propertydetails/:id',
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
        hydrateFallbackElement: '',
        loader: async ({ params }) =>
          await fetch(`http://localhost:3000/realagent/${params?.id}`).then((result) =>
            result.json()
          ),
      },

      {
        path: '/addpropertise',
        element: (
          <PrivateRoute>
            <AddPropertise />
          </PrivateRoute>
        ),
      },
      {
        path: '/mypropertise',
        element: (
          <PrivateRoute>
            <MyPropertise />
          </PrivateRoute>
        ),
      },
      {
        path: '/loginpage',
        element: <LoginPage />,
      },
      {
        path: '/registerpage',
        element: <RegisterPage />,
      },
      {
        path: '/reset',
        element: <Reset />,
      },
      {
        path: '/updateproperties/:id',
        element: (
          <PrivateRoute>
            <UpdateProperties />
          </PrivateRoute>
        ),
        loader: async ({ params }) =>
          await fetch(`http://localhost:3000/realagent/${params?.id}`).then((result) =>
            result.json()
          ),
      },

      {
        path: '/myratings',
        element: (
          <PrivateRoute>
            <MyRatings />
          </PrivateRoute>
        ),
      },
      {
        path: '/latestproperty',
        element: <LatestProperty />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);
