import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
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

      // This binding is necessary to make `this` work in the callback
     // this.handleNameChange = this.handleNameChange.bind(this);
     // this.handleNewMessage = this.handleNewMessage.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     //this.updateMessages = this.updateMessages.bind(this);
  }

/*
  handleSubmit(username, content) {
    this.setState({
      username: username,
      content: content
    });
    console.log(username, content);

  }
*/

  updateMessages(newMsg) {
    const changedMessages = this.state.messages.concat(newMsg);
    this.setState({ messages: changedMessages  })
  }

  handleSubmit(username, content) {
    let message = {
      username: username,
      content: content
    };
    console.log(username, content);
    console.log(message);

    this.updateMessages(message);
  }


  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser}
                 //handleNameChange={this.handleNameChange}
                 //handleNewMessage={this.handleNewMessage}
                 handleSubmit={this.handleSubmit} />

      </div>
    );
  }
}
export default App;
