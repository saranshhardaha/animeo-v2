import IconButton from "Components/Buttons/IconButton";
import * as Icon from "react-feather";
import React from "react";
const GenreSelect = () => {

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-lg px-1">Genres</p>
      </div>
      <div className="flex items-center">
        <IconButton icon={<Icon.Activity />} text="Action" />
      </div>
    </div>
  )
}

export default GenreSelect;