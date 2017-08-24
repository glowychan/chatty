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
    if (e.keyCode === 13) {
      this.props.handleMsgSubmit(this.state.content);
      this.setState({ content: '' });
    }
  }

  handleNameKeypress(e) {
    if (e.keyCode === 13 && e.target.value.length > 0) {
      this.props.handleNameChange(e.target.value);
    }
  }

  render() {
    const { currentUser, handleNameChange } = this.props;
    const { content } = this.state;
    const username = currentUser ? currentUser.name : 'Anonymous';

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Type your name and hit ENTER"
          value={username}
          onKeyUp={this.handleNameKeypress.bind(this)}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={content}
          onChange={this.onMessageInput}
          onKeyUp={this.handleMsgKeypress.bind(this)}
        />
      </footer>
    );
  }
}
export default ChatBar;

