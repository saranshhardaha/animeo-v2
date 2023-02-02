import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="flex bg-white h-16">
        <div className="flex items-center mx-auto gap-2 w-full max-w-[1440px] px-6">
          <a href="/">Home</a>
          <div>MenuItems</div>
          <div>Login</div>
        </div>
      </nav>
    );
  }
}

export default Header;
