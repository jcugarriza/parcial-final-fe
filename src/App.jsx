import './App.css'
import React from 'react';
import ClientBody from './Componentes/ClientBody/ClientBody'
import AdminBody from './Componentes/AdminBody/AdminBody'
import Login from './Componentes/Login/Login'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:'/',
    element:<div><Login/></div>
  },
  {
    path:'/login',
    element:<div><Login/></div>
  },
  {
    path:'/admin',
    element:<div><AdminBody/></div>
  },
  {
    path:'/client',
    element: <div><ClientBody/></div>
  },
])

function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
