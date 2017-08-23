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

/*
  updateMessages(newMsg) {
    const changedMessages = this.state.messages.concat(newMsg);
    this.setState({ messages: changedMessages });
  }
  */

  handleSubmit(username, content) {
    let message = {
      username: username,
      content: content
    };

    this.socket.send(JSON.stringify(message));

    // this.updateMessages(message);
    this.socket.onmessage = (e) => {
      const parsedMessage = JSON.parse(e.data);
      const newMessages = this.state.messages.concat(parsedMessage);
      this.setState({ messages: newMessages });
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
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
