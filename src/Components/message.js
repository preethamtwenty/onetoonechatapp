import React, { useEffect,useState } from 'react';
import '../Css/message.css';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';


import { useAuthState } from 'react-firebase-hooks/auth';
import { auth ,db} from '../firebase';
import { useSelector } from 'react-redux';
import { selectOnlineUsers } from '../features/Online/onlineSlice';
import {useCollection} from 'react-firebase-hooks/firestore';
import { selectChatName } from '../features/Chat/appSlice';



function Message({message,id,time,m_user}) {
    const user=useAuthState(auth);
    const useremail=user[0].email;
    const [onlineUsers,setOnlineusers]=useState('')
    useEffect(()=>{
        db.collection('online').onSnapshot((snapshot) =>
        setOnlineusers(snapshot.docs.map((doc) => (
            
             doc.data().email
            )))
        
        
         
             
    
     );
     
        

    },[id])
    console.log()
    
    

    
    const name=useSelector(selectChatName)
    console.log(name.email)

    const online =onlineUsers.includes(name.email)
    
    
    console.log(online)
    
    
    return (
        
        <div className="messages">
            {
    user[0].email===m_user?(
        
      
        <div className="message___sender">
            <div className="message__sender">
                <div className="message__body">{message}</div>
            </div>

            <div>
                <div>
                </div>
                <div>
                    {
                        online?(
                            <>
                            <DoneAllIcon className="check__icon"/>
                            </>

                        ):(
                            <>
                            <CheckIcon className="check__icon"/>
                            </>

                        )
                    }
                    
                </div>
            </div>
        </div>
       
     

    ):(
     
        <div className="message___reciever">
        <div className="message__reciever">
            <div className="message__body__recieve">{message}</div>
            <div className="message__footer"><div></div>
            </div>

        </div>
        </div>
    
       
        
        

    )
}
            
        </div>

     
       

        
        
    )
}

export default Message
