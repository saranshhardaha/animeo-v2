import React, { Component } from "react";
import * as Icon from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
class FooterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }
  render() {
    return (
      <motion.div className="flex justify-between md:hidden fixed z-10 bottom-0 bg-black/80 backdrop-blur h-10 w-full ">
        <div className="flex justify-between items-center w-full h-full max-w-[1200px] mx-auto gap-2 px-4 md:px-0">
          <a href="/" className="flex gap-1 items-center">
            <Icon.Droplet size="1rem" fill="#000" />
            Animeo
          </a>
          <div>
            <button
              onClick={() => this.setState({ isActive: !this.state.isActive })}
            >
              <Icon.Grid size="1rem" fill="#000" />
            </button>
          </div>
          <AnimatePresence mode="popLayout">
            {this.state.isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                transition={{ duration: 0.5 }}
                style={{ pointerEvents: "auto" }}
                className="fixed flex flex-col gap-4 bottom-10 left-0 h-auto px-4 py-5 w-full backdrop-blur-2xl bg-black"
              >
                <div className="flex items-center w-full bg-white/5 pl-1 pr-3 rounded-full text-white group hover:bg-white/10 transition-all max-w-[32rem] mx-auto">
                  <button className="p-2 opacity-50 group-focus-within:opacity-80">
                    <Icon.Search size={20} />
                  </button>
                  <motion.input
                    type="text"
                    placeholder="Search"
                    className="p-2 pl-3 bg-transparent focus-visible:outline-none w-full transition-all"
                  />
                </div>
                <div className="flex justify-center gap-6 w-full mx-auto">
                  <button className="flex items-center justify-center font-semibold gap-2 hover:bg-white/5 transition-all px-6 py-3">
                    <Icon.Settings size={24} />
                  </button>
                  <button className="flex items-center justify-center font-semibold gap-2 hover:bg-white/5 transition-all px-6 py-3">
                    <Icon.Heart size={24} />
                  </button>
                  <button
                    onClick={() =>
                      this.setState({
                        isSettingActive: !this.state.isSettingActive,
                      })
                    }
                    className="flex items-center gap-3 rounded-full bg-white/5 p-1 transition-all hover:bg-white/10"
                  >
                    <img
                      alt="Profile_picture"
                      src="https://placekitten.com/32/32"
                      className="h-8 w-8 rounded-full bg-white"
                    />
                  </button>
                  <button className="flex items-center justify-center font-semibold gap-2 hover:bg-white/5 transition-all px-6 py-3">
                    <Icon.LogOut size={24} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }
}

export default FooterMenu;
