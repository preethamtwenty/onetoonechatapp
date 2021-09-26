const getSender=(users,userLoggedin)=>(
    users?.filter((userToFilter)=>userToFilter!==userLoggedin?.email)
    
    


)
export default getSender;

onClick={()=>
    dispatch(setchatInfo({
        chatId:id,
        chatName:sender,
    }))
    }

    {messages.map(({m_id,m_data}) => (
        < Message
        key={m_id}
        id={m_id}
        message={m_id.message}
        time={m_data.timestamp}
          
          
        
        />
))}

useEffect(()=>{
    db.collection('chats').doc(id).collection('messages')
    
    .onSnapshot((snapshot) =>
    setMessages(snapshot.docs.map((doc) => (
     { m_id: doc.id, 
       m_data: doc.data() 
     })))
 );



},[])
console.log(messages)




{
    user[0].email===m_user?(
        
      
        <div className="message___sender">
            <div className="message__sender">
                <div className="message__body">{message}</div>

                <div className="message__footer">
                <DoneAllIcon className="check__icon"/>
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