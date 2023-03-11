import React, { MouseEventHandler } from "react";
type Props = {
  text: string,
  primary: boolean,
  onClick: MouseEventHandler
}
const Button = ({ text, primary, onClick }: Props) => (
  <button onClick={onClick} className="flex">
    {text}
  </button>
)

export default Button;