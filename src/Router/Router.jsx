import { createBrowserRouter } from "react-router";
import Layout from "../MainLayout/Layout";
import AllProducts from "../Pages/AllProducts";
import Profile from "../Pages/Profile";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import Home from "../Pages/Home";
import Reset from "../Componets/Reset";
import UpdateProduct from "../Pages/UpdateProduct";
import ErrorPage from "../Componets/ErrorPage";
import PropertyDetails from "../Pages/PropertyDetails";
import MyRatings from "../Componets/MyRatings";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/allproducts',
        element: <AllProducts />,
        loader: () => fetch('http://localhost:3000/realagent'),
      },
      {
        path: '/propertydetails/:id',
        element: <PropertyDetails />,
        loader: ({ params }) => fetch(`http://localhost:3000/realagent/${params.id}`),
      },
      {
        path: '/profile',
        element: <Profile />,
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
        path: '/updateproduct',
        element: <UpdateProduct />,
      },
      {
        path:'/myratings',
        element:<MyRatings/>
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);