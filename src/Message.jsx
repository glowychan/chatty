import React from 'react';

const Message = ({ username, content }) => (
  <div className="message">
    <span className="message-username">{username}</span>
    <span className="message-content">{content}</span>
  </div>
);

export default Message;

// if username has changed return
// <div class="message system">
//  Anonymous1 changed their name to nomnom.
// </div>