import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client'

function Chat() {
const socket =io('http://localhost:5000/')

const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message);
      setMessages([...messages, message]);
    });
  }, [messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if(message!==""){
      socket.emit('message', { text: message, type: 'user' });
      setMessage('');
    }
    
  };

  return (
    <div className="App">
      <h1>Chat App</h1>
      <div className="chat">
        <div className="message-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.type === 'user' ? 'user-message' : 'other-user-message'}
            >
              {message.text}
            </div>
          ))}
        </div>
       
      </div>
      <form onSubmit={handleMessageSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
          />
          <button type="submit">Send</button>
        </form>
    </div>
  );
}

export default Chat