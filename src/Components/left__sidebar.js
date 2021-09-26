import React from 'react';
import '../Css/left__sidebar.css';

import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

//import { useDispatch, useSelector } from 'react-redux';
//import { logout, selectUser } from '../features/User/userSlice';
import { auth,db } from '../firebase';

import { useAuthState } from 'react-firebase-hooks/auth';
import {deletechatInfo} from '../features/Chat/appSlice';
import { useDispatch } from 'react-redux';


function Left__sidebar() {


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: '#44b700',
          color: '#44b700',
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
      }));
      
      const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
      }));
      
      const user=useAuthState(auth);
      console.log(user[0].uid)
      
      
      const dispatch = useDispatch()
      

      const Signout=()=>{
        
        dispatch(deletechatInfo())
        db.collection('online').doc(user[0].uid).delete()

        auth.signOut()
        
        

        
      }
      
      


    return (
        <div className="left__sidebar">
            <div style={{}}>
                <ChatBubbleIcon className="chatbubble__icon"/>
            </div>

            <div>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                <Avatar alt="Remy Sharp" src={user[0].photoURL} onClick={Signout} />
                </StyledBadge>
            
            </div>

           
        </div>
    )
}

export default Left__sidebar;
