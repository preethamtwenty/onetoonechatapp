import React from 'react';
import '../Css/login.css';

import g from '../Media/g1.png';
import Button from '@mui/material/Button';

import { auth, db, provider } from '../firebase';

import { useSelector, useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {
    login, logout 
} from '../features/User/userSlice';
import {  useHistory } from "react-router-dom";
import { selectUser } from '../features/User/userSlice';



function Login() {
    const dispatch = useDispatch();
    const history=useHistory();
   

   
    
    const Signin=()=>{
        auth
        .signInWithPopup(provider) .then((result)=>{  
            const unsubscribe = auth.onAuthStateChanged((authUser) => {
                if (authUser) {
                  // user is logged in...
                  console.log(authUser);
                  dispatch(login({
                    user:authUser
                
              
              }))
              
              db.collection('users').doc(authUser.uid).set(
                  {
                    email:authUser.email,
                    photoURL:authUser.photoURL,
                    username:authUser.displayName,

                  },{
                      merge:true
                  })
                  db.collection('online').doc(authUser.uid).set(
                      {
                        email:authUser.email,
                        photoURL:authUser.photoURL,
                        username:authUser.displayName,

                      },{
                          merge:true
                      }
                  )

                   

                }
            
                else {
                    
                  
                }
              });     
            
            
            
         
        })
        .catch((error)=>alert(error.message))
    }
    return (
        <div className="login">
            <div>

            </div>
            <div>
                <Button className="login__button" variant="contained" onClick={Signin}>
                    Login with 
                    <img src={g} className="google__image"/></Button>
            </div>
            <div>

            </div>
            
        </div>
    )
}

export default Login;
