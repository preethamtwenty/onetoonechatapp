import React,{useState,useEffect} from 'react';
import '../Css/sidebar.css';

import i1 from '../Media/i1.jpeg';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar__chat from './sidebar_chat';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/User/userSlice';
import { db,auth } from '../firebase';
import * as EmailValidator from 'email-validator';

import {useCollection} from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { setOnlineUsers } from '../features/Online/onlineSlice';
import Online from './online';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import ChatBubbleIcon from '@mui/icons-material/ChatBubble';



function Sidebar() {
    const user=useAuthState(auth);
    const [sendermail,setSendermail]=useState('')
    
    const userchatref=db.collection('chats').where('users','array-contains',user[0].email) //if the email is seen
    const [chatSnapshot]=useCollection(userchatref);
    const dispatch=useDispatch()
    

    const usermail=user[0].email

    console.log(user[0].email)
  

    const createChat=(e)=>{
        e.preventDefault()
        if (EmailValidator.validate(sendermail) && sendermail!==user[0].email && !chatexists(sendermail)){
            db.collection('chats').add({
                users:[user[0].email,sendermail]

    
    
            })
            alert(sendermail)
            setSendermail('')
            
            
       

        } }

    const chatexists=(recepientemail)=>{
       return  !!chatSnapshot?.docs.find(chat=>chat.data().users.find(user=>user===recepientemail)?.length>0)
       
    }
    const [online,setOnline]=useState([])
    useEffect(()=>{
        db.collection('online').onSnapshot((snapshot) =>
        setOnline(snapshot.docs.map((doc) => (
            { o_id: doc.id, 
            o_data: doc.data() 
            })))
        
        
         
             
    
     );
     dispatch(setOnlineUsers({
         online
                
    }))
        

    },[])
    
    console.log(online)


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height:300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

    
    
   


    return (
        <div className="sidebar">
            <div className="sidebar__1">
                <img src={user[0].photoURL} className="sidebar__1__image" alt={user[0].displayName}/>
                <div className="sidebar__1__name">
                    {user[0].displayName}
                </div>

                <div style={{marginTop:'10px',color:"rgb(134,134,134)"}}>
                    My account
                </div>
                <div style={{marginTop:'10px',color:"rgb(134,134,134)"}}>
                    {user[0].email}
                </div>
                
            </div>

            <div className="sidebar__2">
                <div className="sidebar__2__header">
                    Online Now
                </div>

                <div className="sidebar__2__body">
                    {online.map(({o_id,o_data}) => (
                        o_data.email==usermail?(
                            <>
                            </>

                        ):(
                            <Online photo={o_data.photoURL}/>

                        )

                    
                    
              
            
            
  ))}
                </div>


            </div>
            <div className="sidebar__3__search">
                <div>

                </div>

                <div>
                <button  onClick={handleOpen} className="modal__open" >Create Chat</button>

                </div>

                <div>

                </div>
                    
                    
                    
            </div>


            <div className="sidebar__3">
                <div className="sidebar__3__1">
                    Chat
                </div>

               

                <div className="sidebar__3__body">
                   
                    
                        
                        {chatSnapshot?.docs.map((chat)=>(
                        <Sidebar__chat key={chat.id} id={chat.id} users={chat.data().users}/>)
                    )}
                        
                        
                    
                    
                  

                    

                </div>
                
            </div>
          
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            
            <Box sx={style}>
                
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <div>

                    </div>

                    <div>
                    <ChatBubbleIcon className="modal__icon"/>
                    

                    </div>

                    <div>
                        

                    </div>


                </div>

                
            <input type="text" className="input__search" placeholder="Add an email" value={sendermail} onChange ={e=>setSendermail(e.target.value)} />
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'50px'}}>
                <div>

                </div>

                <div> <button onClick={createChat} className="modal__open" >Submit</button></div>

                <div></div>

               

            </div>
            <div style={{marginTop:'20px',color:'red'}}
            >Please enter a valild GMAIL ID ,otherwise it will crash</div>

            
            </Box>
            
            </Modal>
        </div>
    )
}

export default Sidebar
