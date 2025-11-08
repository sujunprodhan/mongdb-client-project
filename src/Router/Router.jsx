import { createBrowserRouter } from "react-router";
import Layout from "../MainLayout/Layout";
import AllProducts from "../Pages/AllProducts";
import Profile from "../Pages/Profile";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import ProductDetails from "../Pages/ProductDetails";
import Home from "../Pages/Home";

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
        path: '/productdetails/:id',
        element: <ProductDetails />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/loginpage',
        element: <LoginPage />
      },
      {
        path: '/registerpage',
        element: <RegisterPage />
      },
    ],
  },
]);