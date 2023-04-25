import React, { useState } from "react";
import * as Icon from "react-feather";
import { motion, AnimatePresence } from "framer-motion";


const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [isSettingActive, setIsSettingActive] = useState(false);

  return (
    <motion.div className="fixed flex items-center z-20 top-0 bg-transparent h-12 w-full">
      <div className="flex justify-between items-center h-full gap-2 px-4 text-white text-sm w-full bg-black/90 backdrop-blur-xl">
        <div className="flex items-center gap-4 h-full">
          <a
            href="/"
            className="flex gap-1 items-center opacity-60 hover:opacity-100 group"
          >
            <Icon.Droplet size={20} />
            <p>Animeo</p>
          </a>
          <motion.div className=" hidden md:flex items-center gap-2 rounded-full bg-white/5 p-1">
            <motion.div
              className={`"flex p-1.5 px-4 transition-all tracking-wider cursor-pointer rounded-full ${activeItem === "Animes"
                ? "text-black bg-white/80 hover:bg-white font-semibold"
                : "text-white opacity-50 hover:opacity-100"
                } "`}
            >
              Animes
            </motion.div>
            <motion.div
              className={`"flex p-1.5 px-4 transition-all tracking-wider cursor-pointer rounded-full ${activeItem === "Movies"
                ? "text-black bg-white/80 hover:bg-white font-semibold"
                : "text-white opacity-50 hover:opacity-100"
                } "`}
            >
              Movies
            </motion.div>

            <motion.div
              className={`"flex p-1.5 px-4 transition-all tracking-wider cursor-pointer rounded-full ${activeItem === "Filter"
                ? "text-black bg-white/80 hover:bg-white font-semibold"
                : "text-white opacity-50 hover:opacity-100"
                } "`}
            >
              Filter
            </motion.div>
          </motion.div>
        </div>
        <div className="flex items-center gap-4 h-full">
          <a href="/search" className="p-1 px-2 opacity-50 hover:opacity-80 transition-al">
            <Icon.Search size={16} />
          </a>
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
              setIsSettingActive(!isSettingActive)
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
            {isSettingActive && (
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
      </div>
    </motion.div>
  )
}

export default Header;
