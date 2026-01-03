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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // or "dark" jodi dark mode use koro
        toastStyle={{
          background: 'linear-gradient(to right, #ec4899, #a855f7)', // pink to purple gradient
          color: 'pink',
          fontWeight: 'bold',
          borderRadius: '16px',
          boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.4)',
        }}
        progressStyle={{
          background: '#F22891',
        }}
        closeButtonStyle={{
          color: 'white',
        }}
      />
    </Authprovider>
  </StrictMode>
);
