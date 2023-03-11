import React, { MouseEventHandler } from "react";
type Props = {
  text: string,
  onClick?: MouseEventHandler
}
const Banner = ({ text, onClick }: Props) => (
  <div onClick={onClick} className="grid place-items-center min-h-[14rem] rounded-md bg-white/5">
    {text}
  </div>
)

export default Banner;