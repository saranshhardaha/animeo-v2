import React from "react";
import * as Icon from "react-feather";


const Footer = () => (
  <div className="h-full p-4 py-2 w-full bg-white/5 flex flex-col gap-2">
    <div>

    </div>
    <div>

    </div>
    <div className="text-sm flex gap-1 items-center">
      <Icon.Droplet size={16} />
      <p>Animeo</p>
    </div>
    <div className="text-xs flex flex-col items-center gap-1">
      <p className="text-neutral-400 text-center">Animeo does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</p>
    </div>
  </div>
)

export default Footer;
