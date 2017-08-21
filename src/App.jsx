import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous"
    };
  }

  render() {
    return (
      <div>
        <MessageList />
        <ChatBar currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
