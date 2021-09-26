import React from 'react';
import {
    
    Circle,
    
  } from 'better-react-spinkit';
import '../Css/loader.css';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

function Loader() {
    return (

        <div className="loader">

            <div>

            </div>
           

            <div>

                <div className="loeader__1">
                    <div className="loader__text" >
                    Welcome to 

                    </div>
                   
                    <div>
                    <ChatBubbleIcon className="chatbubble___icon"/>
                    </div>
                </div>
            
            <div className="loader__text"></div>
            <Circle color="white" size={100}/>

            </div>

            <div>

            </div>

        
        </div>
    )
}

export default Loader
