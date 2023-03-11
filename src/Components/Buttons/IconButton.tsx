import React, { MouseEventHandler } from "react";
type Props = {
  text: string,
  icon: string | JSX.Element | JSX.Element[],
  onClick?: MouseEventHandler
}
const IconButton = ({ text, icon, onClick }: Props) => (
  <a href={`/genre/${text}`} className="flex flex-col items-center justify-center gap-2 h-20 md:h-24 min-w-[5rem] md:min-w-[6rem] bg-white/5 rounded-md hover:opacity-80 cursor-pointer transition-all">
    {icon}
    <p className="text-sm md:text-sm text-neutral-400">{text}</p>
  </a>
)

export default IconButton;