import React,{useState} from 'react';

import './App.css';

import Left__sidebar from './Components/left__sidebar';
import Sidebar from './Components/sidebar';
import Chat from './Components/chat';
import Login from './Components/login';
import Loader from './Components/Loader';

import { useSelector } from 'react-redux';
import { selectUser } from './features/User/userSlice';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  
} from "react-router-dom";
import { useParams } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Loading from './Components/loading';

import { selectChatId, selectChatName } from './features/Chat/appSlice';


function App() {

  const [user, loading]=useAuthState(auth);

  //console.log(id)
  console.log(user)

  const id=useSelector(selectChatId)

  

  if (loading) return <Loading/>

  
  
  
 



  return (
    <div className="App">
      {
        user===null?(
          <>
          <Login/>
          </>

        ):(
          <>
          {
            id==null?(
              <>
              <Left__sidebar/>
              <Sidebar/>
              <Loader/>
              
              </>
            ):(
              <>
              <Left__sidebar/>
              <Sidebar/>
              <Chat/>
              
              </>
            )
          
          }
          

          </>

        )
      }
      
  
      
          
          
            

          
          

       
      
  
    

      
     
    </div>
  );
}

export default App;
