import React from 'react';
import Message from './Message.jsx';

const MessageList = ({ messages }) => (
  <main className="messages">
    {
      messages.map((message, index) => (
        <Message
          content={message.content}
          username={message.username}
          key={index}
        />
      ))
    }
  </main>
);

export default MessageList;
