import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.onMessageInput = this.onMessageInput.bind(this);
  }

  onMessageInput(e) {
    this.setState({ content: e.target.value });
  }

  handleMsgKeypress(e) {
    const { content } = this.state;
    const { currentUser, handleSubmit } = this.props;
    const username = currentUser ? currentUser.name : 'Anonymous';

    if (e.keyCode === 13) { // on 'Enter' pressed
      handleSubmit(username, content); // creates a new message in App's message list
      this.setState({ content: '' }); // reset message content
    }
  }

  render() {
    const { currentUser, onNameChange } = this.props;
    const { content } = this.state;
    const username = currentUser ? currentUser.name : 'Anonymous';

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder={username}
          value={username}
          onChange={onNameChange}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={content}
          onChange={ this.onMessageInput }
          onKeyUp={this.handleMsgKeypress.bind(this)}
        />
      </footer>
    );
  }
}
export default ChatBar;

