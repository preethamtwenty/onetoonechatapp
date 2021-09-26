import React, { useEffect,useState } from 'react';
import '../Css/chat.css';

import Message from './message';

import Avatar from '@mui/material/Avatar';

import i1 from '../Media/i1.jpeg';

import SendIcon from '@mui/icons-material/Send';

import { useSelector } from 'react-redux';
import { selectUser } from '../features/User/userSlice';
import { useParams } from 'react-router-dom';

import { db ,auth} from '../firebase';
import getSender from '../Utils/getSender';

import { useCollection } from 'react-firebase-hooks/firestore';
import { selectChatId, selectChatName } from '../features/Chat/appSlice';
import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from 'firebase';

function Chat() {



    const [input,setInput]=useState('');
    const user=useAuthState(auth);
    const [users,setUsers]=useState('');
    const chatId=useSelector(selectChatId)
    useEffect(() => {
        if(chatId){
            db.collection('chats').doc(chatId).onSnapshot(
            (snapshot)=>setUsers(snapshot.data())
        )
        console.log(users)

        }
        
       
    }, [chatId])

    const[senderinfo,setSenderinfo]=useState('')

    
    const name=useSelector(selectChatName)
    const id=useSelector(selectChatId)
    
    console.log(user[0].email)
    
    
    
    


    const sendMessage=(e)=>{
        e.preventDefault()
        
        if(input!=null){
            
            db.collection('chats').doc(id).collection('messages').add({
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                user:user[0].email,
                message:input
            })
            console.log(firebase.firestore.FieldValue.serverTimestamp())
            
        }
        setInput('')


    }
   

    const[messagesSnapshot]=useCollection(db.collection('chats').doc(id).collection('messages').orderBy("timestamp","asc"))
    const [messages,setMessages]=useState('');

    useEffect(()=>{
        db.collection('chats').doc(id).collection('messages')
        
        .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => (
         { m_id: doc.id, 
           m_data: doc.data() 
         })))
     );
    
    
    
    },[id])
    console.log(messagesSnapshot)
    


    



   
    
   
    return (

        
        
        <div className="chat">
            

    <div className="chat__header">
                <div className="chat__header__1">
                Chat with 

                </div>
                
                <div className="chat__header__2">
                    {name.username}
                </div>
            </div>

            <div className="chat__body">
                {messagesSnapshot?.docs.map((chat)=>(
                            <Message key={chat.id} id={chat.id} message={chat.data().message} m_user={chat.data().user}/>)
                )}
           </div>

            <div className="chat__footer">
                <Avatar alt="Remy Sharp" src={user[0]?.photoURL}/>
                <form className="chat__input">
                <input type="text" placeholder="Enter Message" value={input}  onChange ={e=>setInput(e.target.value)}className="chat__input"/>
                <div>
                    <button type="submit" hidden disabled={!input} onClick={sendMessage}>Send message</button>
                </div>
                </form>

                

            </div>
                   
        </div>
    )
}

export default Chat;
