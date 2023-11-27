import './App.css'
import React from 'react';
import Client from './Componentes/Dashboard/chat/C-Body'
import Admin from './Componentes/Dashboard/chat/Asistente/asistente'
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
    element:<div><Admin/></div>
  },
  {
    path:'/client',
    element: <div><Client/></div>
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
