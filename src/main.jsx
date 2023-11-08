import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { AssignmentProvider } from './providers/AssignmentProvider.jsx'
import allRoutes from './routes/Routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <AssignmentProvider>
          <RouterProvider router={allRoutes}></RouterProvider>
        </AssignmentProvider>
      </AuthProvider>

    <Toaster></Toaster>
  </React.StrictMode>,
)
