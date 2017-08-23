import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Anonymous' },
      messages: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onNameInput = this.onNameInput.bind(this);
  }

  onNameInput(e) {
    this.setState({
      currentUser: { name: e.target.value }
    });
  }

  handleSubmit(username, content) {
    let message = {
      username: username,
      content: content,
      type: "postMessage"
    };

    this.socket.send(JSON.stringify(message));
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      switch(data.type) {
        case "incomingMessage":
          const newMessages = this.state.messages.concat(data);
          this.setState({ messages: newMessages });
          break;
        case "incomingNotification":
        // handle incoming notification
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
      }
    };
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          onNameChange={this.onNameInput}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;
