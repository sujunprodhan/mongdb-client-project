import { createBrowserRouter } from 'react-router';
import Layout from '../MainLayout/Layout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import Home from '../Pages/Home';
import AllPropertise from '../Pages/AllPropetise';
import Reset from '../Componets/Reset';
import ErrorPage from '../Componets/ErrorPage';
import PropertyDetails from '../Pages/PropertyDetails';
import AddPropertise from '../Pages/Add Propertise/AddPropertise';
import MyPropertise from '../Pages/My ProPertise/MyPropertise';
import LatestProperty from '../Pages/LatestProperty/LatestProperty';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import UpdateProperties from '../Pages/UpdateProperties';
import MyRating from '../Pages/My Rating/MyRating';
import Profile from '../Pages/Profile';
import ForgetPassword from '../Componets/ForgetPassword';
import Dashboard from '../Pages/DashboardLayouts/Dashboard';
import About from '../Pages/AboutSection/About';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('https://mongodb-server-site.vercel.app/latestproperty'),
      },
      {
        path: '/about',
        element: <About></About>,
      },
      {
        path: '/allpropertise',
        element: <AllPropertise />,
        loader: () => fetch('https://mongodb-server-site.vercel.app/realagent'),
      },
      {
        path: '/propertydetailes/:id',
        element: <PropertyDetails />,
        hydrateFallbackElement: '',
        loader: async ({ params }) =>
          await fetch(`https://mongodb-server-site.vercel.app/realagent/${params?.id}`).then(
            (result) => result?.json()
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
          await fetch(`https://mongodb-server-site.vercel.app/realagent/${params?.id}`).then(
            (result) => result.json()
          ),
      },

      {
        path: '/myrating',
        element: (
          <PrivateRoute>
            <MyRating />
          </PrivateRoute>
        ),
      },

      {
        path: '/forgetpassword',
        element: <ForgetPassword />,
      },
      {
        path: '/latestproperty',
        element: <LatestProperty />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);
