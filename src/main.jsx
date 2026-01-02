import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router.jsx'
import { ToastContainer } from 'react-toastify'
import Authprovider from './AuthProvider/Authprovider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Authprovider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer></ToastContainer>
      </Authprovider>
  </StrictMode>
);
