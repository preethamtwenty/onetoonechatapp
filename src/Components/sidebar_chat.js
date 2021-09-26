import React,{useState,useEffect} from 'react';
import '../Css/sidebar_chat.css';

import Avatar from '@mui/material/Avatar';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db,auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/User/userSlice';
import getSender from '../Utils/getSender';

import {setchatInfo} from '../features/Chat/appSlice';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
    
  } from "react-router-dom";

import { useAuthState } from 'react-firebase-hooks/auth';


function Sidebar_Chat({id,users}) {
    const dispatch=useDispatch()
    //const user=useSelector(selectUser);
    const user=useAuthState(auth);
    const useremail=user[0].email
    useEffect(() => {
        console.log(users)
    }, [id])

    
    var sendermail=getSender(users,useremail)

    const [sendersnapshot]=useCollection(db.collection('users').where("email","==",sendermail[0]))
    const sender=sendersnapshot?.docs?.[0]?.data()
    
    
    const chatId=id

    const gotoChat=()=>{
        if(chatId){
            
        dispatch(setchatInfo({
            chatId:id,
            chatName:sender,
        }))
        

    }}
    
  
    

    
  
    
    

    
    return (

       

        
        
    
        <div className="sidebar__chat" onClick={gotoChat}
            
        >

            
            {
                
                sender?(
                    <>
                     <Avatar alt={sendermail} src={sender?.photoURL}  />
                     <div className="sidebar__chat__2">
                        <div  className="sidebar__chat__name">
                            {sendermail}
                            
                        </div>
                        <div  className="sidebar__chat__chat">
                            Last message
                        </div>
                        
                    </div>
                    </>

                ):(
                    <>

                    <Avatar alt={sendermail}   />
                    <div className="sidebar__chat__2">
                        <div  className="sidebar__chat__name">
                          {sendermail}
                        </div>
                        <div  className="sidebar__chat__chat">
                            Last message
                        </div>
                    </div>
                    </>
           
                )
                
            }
            
            
        </div>
        
       
    )
}

export default Sidebar_Chat
