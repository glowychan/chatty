import React from 'react';

const Message = ({ username, content ,color }) => (
  <div className="message">
    <span className="message-username" style={{color: color}}>{username}</span>
    <span className="message-content">{content}</span>
  </div>
);

export default Message;