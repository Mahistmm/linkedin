import React, { useState } from 'react'
import './App.css'
import {onAuthStateChanged,signOut} from "firebase/auth"
import { useEffect } from 'react'
import {auth} from "./firebase"
import Login from './Components/Login/Login'
import Header from '../src/Components/Header/Header'
import Left from './Components/Sidebar/Left/Left'
import Postuplaod from './Components/Postuploader/Postupload/Postuplaod'

const App = () => {

  const [user,setUser] = useState(null)

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
    setUser(user);
    })
  },[])
  
  return (
    <div className='app'>
      {
        (!user) ? (
         <Login setUser={setUser}/>
        ):(
         <>
          <Header user={user}/>
          <div className='body'>
            <Left user={user}/>
            <Postuplaod user={user}/>
          </div>
         </>
        )
      }
    </div>
  )
}

export default App

