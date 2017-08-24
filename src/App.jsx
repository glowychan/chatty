import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineCount: 0,
      currentUser: { name: 'Anonymous', color: 'red' },
      messages: []
    };
    this.handleMsgSubmit = this.handleMsgSubmit.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
  }

  handleNameSubmit(name) {
    let message = {
      content: `${this.state.currentUser.name} has changed name to ${name}`,
      type: "postNotification"
    };

    this.setState({currentUser: {name: name, color: 'red'}}); //should be what the server gives you

    this.socket.send(JSON.stringify(message))
  }

  handleMsgSubmit(content) {
    let message = {
      username: this.state.currentUser.name,
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
        case "userNotification":
          this.setState({ onlineCount: data.count });
          break;
        case "incomingMessage":
          const newMessages = this.state.messages.concat(data);
          this.setState({ messages: newMessages });
          break;
        case "incomingNotification":
          const newNotifications = this.state.messages.concat(data);
          this.setState({ messages: newNotifications });
          break;
      default:
        throw new Error("Unknown event type " + data.type);
      }
    };
  }

  render() {
    return (
      <div>
        <NavBar countUser={this.state.onlineCount} />
        <MessageList messages={this.state.messages} color={this.state.currentUser.color} />
        <ChatBar
          currentUser={this.state.currentUser.name}
          handleNameChange={this.handleNameSubmit}
          handleMsgSubmit={this.handleMsgSubmit}
        />
      </div>
    );
  }
}

export default App;
