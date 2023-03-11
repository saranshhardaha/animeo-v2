import React from 'react'
type Props = {
  Dark?: boolean 
}
const DotIcon = ({ Dark }: Props) => (<div className={Dark ? "text-black" : "text-white/50"}>•</div>)

export default DotIcon