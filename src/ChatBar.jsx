import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.currentUser ? props.currentUser.name : 'Anonymous',
      content: ''
    };
    this.onNameInput = this.onNameInput.bind(this);
    this.onMessageInput = this.onMessageInput.bind(this);
  }

  onNameInput(e) {
    this.setState({ username: e.target.value });
  }

  onMessageInput(e) {
    this.setState({ content: e.target.value });
  }

  handleMsgKeypress(e) {
    const { username, content } = this.state;
    if (e.keyCode === 13) {
      this.props.handleSubmit(username, content);
      this.setState({ content: '' });
    }
  }

  render() {
    const { currentUser } = this.props;
    const { username, content } = this.state;

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder={currentUser.name}
          value={username}
          onChange={this.onNameInput}
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

