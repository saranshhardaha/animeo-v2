import React, { Component } from "react";
import * as Icon from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }
  render() {
    return (
      <motion.div className="fixed z-10 top-0 bg-white h-16 w-full ">
        <div className="flex justify-between items-center h-full gap-2 px-4">
          <a href="/" className="flex gap-1 items-center">
            <Icon.Droplet size="1rem" fill="#000" />
            Animeo
          </a>
          <div>
            <div className="flex items-center w-full bg-black rounded-full">
              <input type="text" className="p-2 px-3 " />
              <button>
                <Icon.Search />
              </button>
            </div>
          </div>
          <div className="sm:hidden">
            <button
              onClick={() => this.setState({ isActive: !this.state.isActive })}
            >
              <Icon.Grid size="1rem" fill="#000" />
            </button>
            <AnimatePresence mode="popLayout">
              {this.state.isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  style={{ pointerEvents: "auto" }}
                  className="fixed bottom-10 left-0 h-auto px-4 py-5 w-full bg-white"
                >
                  <div className="flex justify-evenly w-full">
                    <Icon.Home />
                    <Icon.Tv />
                    <Icon.List />
                    <Icon.Search />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  }
}

export default Header;
