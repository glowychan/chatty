import React from 'react';
import Message from './Message.jsx';

const MessageList = ({ messages }) => (
  <main className="messages">
    {
      messages.map((message, index) => {
        if (message.type === 'incomingMessage') {
          return <Message
            content={message.content}
            username={message.username}
            key={message.id}
          />
        } else if (message.type === 'incomingNotification') {
          return <div className="message system">
            <Message
              content={message.content}
              key={message.id}
            />
          </div>
        }

      })
    }
  </main>
);

export default MessageList;