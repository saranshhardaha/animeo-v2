import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="flex bg-white h-16">
        <div className="flex items-center mx-auto gap-2 w-full max-w-[1440px]">
          <a href="/">LOGO</a>
          <div>MenuItems</div>
          <div>Search/Login</div>
          <div>
            <input type="search" name="search" className="px-3 p-2 ring-1 ring-black backdrop-blur-md bg-transparent focus-visible:ring-0"/>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
