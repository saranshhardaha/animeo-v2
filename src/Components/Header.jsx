import React, { Component } from "react";
import * as Icon from "react-feather";
class Header extends Component {
  render() {
    return (
      <nav className="flex bg-white h-16">
        <div className="flex items-center mx-auto gap-2 w-full backdrop-blur-lg  max-w-[1440px] px-4">
          <a href="/" className="flex gap-1 items-center">
            <Icon.Droplet  />
            Animeo
          </a>
        </div>
      </nav>
    );
  }
}

export default Header;
