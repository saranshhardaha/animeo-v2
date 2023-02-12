import React, { Component } from "react";
import * as Icon from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isSettingActive: false,
      activeItem: "Animes",
    };
  }
  render() {
    return (
      <motion.div className="hidden fixed md:flex items-center z-20 top-0 bg-transparent h-12 w-full">
        <div className="flex justify-between items-center h-full gap-2 px-4 text-white text-sm w-full bg-black/70 backdrop-blur-xl">
          <div className="flex items-center gap-4 h-full">
            <a
              href="/"
              className="flex gap-1 items-center opacity-60 hover:opacity-100 group"
            >
              <Icon.Droplet size={20} />
              <p>Animeo</p>
            </a>
            <motion.div
              initial={{ width: "8rem" }}
              transition={{
                x: { duration: 0.6 },
                ease: "linear",
              }}
              exit={{ width: "8rem" }}
              whileHover={{ width: "14rem" }}
              className="flex items-center w-full bg-white/5 pl-1 pr-3 rounded-full text-white group hover:bg-white/10 transition-all"
            >
              <button className="p-1 px-2 opacity-50 group-focus-within:opacity-80">
                <Icon.Search size={16} />
              </button>
              <motion.input
                type="text"
                placeholder="Search"
                className="p-2 pl-3 bg-transparent focus-visible:outline-none w-full transition-all text-sm"
              />
            </motion.div>
            <motion.div className="flex items-center gap-2 rounded-full bg-white/5 p-1">
              <motion.div
                className={`"flex p-1.5 px-4 transition-all tracking-wider cursor-pointer rounded-full ${
                  this.state.activeItem === "Animes"
                    ? "text-black bg-white/80 hover:bg-white font-semibold"
                    : "text-white opacity-50 hover:opacity-100"
                } "`}
              >
                Animes
              </motion.div>
              <motion.div
                className={`"flex p-1.5 px-4 transition-all tracking-wider cursor-pointer rounded-full ${
                  this.state.activeItem === "Movies"
                    ? "text-black bg-white/80 hover:bg-white font-semibold"
                    : "text-white opacity-50 hover:opacity-100"
                } "`}
              >
                Movies
              </motion.div>

              <motion.div
                className={`"flex p-1.5 px-4 transition-all tracking-wider cursor-pointer rounded-full ${
                  this.state.activeItem === "Filter"
                    ? "text-black bg-white/80 hover:bg-white font-semibold"
                    : "text-white opacity-50 hover:opacity-100"
                } "`}
              >
                Filter
              </motion.div>
            </motion.div>
          </div>
          <div className="flex items-center gap-4 h-full">
            <button className="text-white opacity-50 hover:opacity-80 transition-all">
              <Icon.Bell size={20} fill="#fff" />
            </button>
            <motion.button
              initial={{ width: "2.5rem" }}
              transition={{
                x: { duration: 1 },
                ease: "linear",
              }}
              exit={{ width: "2.5rem" }}
              whileHover={{
                width: "10rem",
              }}
              onClick={() =>
                this.setState({ isSettingActive: !this.state.isSettingActive })
              }
              className="flex items-center justify-between gap-3 rounded-full bg-white/10 p-1 transition-all overflow-hidden hover:bg-white/5"
            >
              <img
                alt="Profile_picture"
                src="https://placekitten.com/32/32"
                className="h-8 w-8 rounded-full bg-white"
              />
              <div className="font-semibold truncate max-w-[7rem]">Saransh</div>
              <div className="pr-3">
                <Icon.ChevronDown size={12} />
              </div>
            </motion.button>
            <AnimatePresence>
              {this.state.isSettingActive && (
                <motion.div
                  initial={{
                    y: -100,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    scale: 0,
                    y: -100,
                    opacity: 1,
                    transition: { duration: 0.5 },
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ pointerEvents: "auto" }}
                  className="fixed z-0 top-12 right-4 h-auto w-40 rounded-b-md bg-black/90 backdrop-blur-xl"
                >
                  <div className="flex flex-col items-center justify-center w-full">
                    <button className="flex items-center justify-between font-semibold gap-2 w-full hover:bg-white/5 transition-all px-6 py-3">
                      <p>Setting</p>
                      <Icon.Settings size={16} />
                    </button>
                    <button className="flex items-center justify-between font-semibold gap-2 w-full hover:bg-white/5 transition-all px-6 py-3">
                      <p>Favorites</p>
                      <Icon.Heart size={16} />
                    </button>
                    <button className="flex items-center justify-between font-semibold gap-2 w-full hover:bg-white/5 transition-all px-6 py-3">
                      <p>Log-out</p>
                      <Icon.LogOut size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
