import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "Anonymous",
      content: ''
    };

    // this.onNameInput = this.onNameInput.bind(this); why don't i need this?
  }

  onNameInput(username) {
    this.setState({username});
    // this.props.handleNameChange(username); // From parent
    console.log(username); //test
  }

  onMessageInput(content) {
    this.setState({content});
    // this.props.handleNewMessage(content); // From parent
    console.log(content); //test
  }

  handleMsgKeypress(event) {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      this.props.handleSubmit(this.state.username, this.state.content);
      this.setState({
        content: ''
      })
    }

  }

  // maybe don't have to update parent component App until onSubmit
  // then onSubmit pushes the data to the array

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
               placeholder={this.props.currentUser.name}
               value={this.state.username}
               onChange={ event => this.onNameInput(event.target.value) } />
        <input className="chatbar-message"
               placeholder="Type a message and hit ENTER"
               value={this.state.content}
               onChange={ event => this.onMessageInput(event.target.value) }
               onKeyUp={this.handleMsgKeypress.bind(this)}
              />
      </footer>
    );
  }
}
export default ChatBar;

