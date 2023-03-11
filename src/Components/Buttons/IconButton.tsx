import React, { MouseEventHandler } from "react";
type Props = {
  text: string,
  icon: string | JSX.Element | JSX.Element[],
  onClick?: MouseEventHandler
}
const IconButton = ({ text, icon, onClick }: Props) => (
  <div className="flex flex-col items-center justify-center gap-2 h-24 w-24 bg-white/5 rounded-md hover:opacity-80 cursor-pointer transition-all">
    {icon}
    <p className="text-sm text-neutral-400">{text}</p>
  </div>
)

export default IconButton;