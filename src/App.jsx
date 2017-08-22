import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // socket: 'ws://localhost:3001',
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateMessages(newMsg) {
    const changedMessages = this.state.messages.concat(newMsg);
    this.setState({ messages: changedMessages  })
  }

  handleSubmit(username, content) {
    let message = {
      username: username,
      content: content
    };

    this.socket.send(JSON.stringify(message));
    this.updateMessages(message);
  }
  //does this go in componentdidmount?

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://localhost:3001');
    console.log(this.socket);
    console.log('connected to server');
  }


  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser}
                 handleSubmit={this.handleSubmit} />

      </div>
    );
  }
}
export default App;
