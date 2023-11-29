import './App.css'
import React from 'react';
import ClientBody from './Componentes/ClientBody/ClientBody'
import AdminBody from './Componentes/AdminBody/AdminBody'
import CreateArticle from './Componentes/CreateArticle/CreateArticle'
import Login from './Componentes/Login/Login'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import data from "./Componentes/Shared/ArticleList/ListData.json"

const LOCAL_STORAGE_INDEX = "1";

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
  {
    path:'/createarticle',
    element: <div><CreateArticle/></div>
  }
])

function App() {
  localStorage.setItem(LOCAL_STORAGE_INDEX, JSON.stringify(data));
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
