import React from 'react';
import {
    
    Circle,
    
  } from 'better-react-spinkit';
import '../Css/loader.css'

function Loading() {
    return (
       
        <div className="loader">
            <div>

            </div>

            <div >
               
                <Circle color="green" size={200}/>
            </div>
            
            <div>

            </div>
            
        </div>
        
    )
}

export default Loading
