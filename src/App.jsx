import React, { useEffect, useState } from 'react';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';
import Users from './components/Users';
import NotFoundPage from './components/NotFoundPage';
import Chatroom from './components/Chatroom';
import Password from './components/Password';
import Home from './components/Home'
import './Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const guestRouter = createBrowserRouter([
  {
    path:'/',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '*',
    element: <NotFoundPage/>
  }
])

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  { 
    path: '/profile',
    element: <Profile/>
  },

  {
    path: '/users',
    element:<Users/>
  },
  {
    path: 'password',
    element: <Password/>
  },
  {
    path: '/chatroom/:id',
    element:<Chatroom/>
  },

  {
    path:'*',
    element: <NotFoundPage/>
  }
])



export default function App() {
  const [isAuthenticated,setIsauthenticated] = useState(false);
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      if(user){
        setIsauthenticated(true)
      }else{
        setIsauthenticated(false)
      }
    })
  },[auth])
  return (
    
   <>
   {
        isAuthenticated ? <RouterProvider router={userRouter}/>
        :
        <RouterProvider router={guestRouter}/>
      }
   </>   
   
  )
}
