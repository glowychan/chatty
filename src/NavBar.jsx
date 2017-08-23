import React from 'react';

const NavBar = ({countUser}) => (
  <nav className="navbar">
    <a href="/" className="navbar-brand">Chatty</a>
    <div className="online-count"><a>{countUser} users online</a></div>
  </nav>
);

export default NavBar;