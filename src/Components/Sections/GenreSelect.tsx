import IconButton from "Components/Buttons/IconButton";
import * as Icon from "react-feather";
import React from "react";
type Props = {
  center?: boolean;
};
const GenreSelect = ({ center = false }: Props) => {
  return (
    <div
      className={`flex flex-col gap-3 w-full ${
        center ? "justify-center items-center" : ""
      }`}
    >
      <p className="max-w-max text-lg px-1">Genres</p>
      <div
        className={`flex items-center w-full gap-2 overflow-scroll scrollbar-hide ${
          center ? "2xl:justify-center" : ""
        }`}
      >
        <IconButton icon={<Icon.Crosshair />} text="Action" />
        <IconButton icon={<Icon.Compass />} text="Adventure" />
        <IconButton icon={<Icon.Heart />} text="Romance" />
        <IconButton icon={<Icon.Smile />} text="Comedy" />
        <IconButton icon={<Icon.Globe />} text="Drama" />
        <IconButton icon={<Icon.Key />} text="Fantasy" />
        <IconButton icon={<Icon.Meh />} text="Horror" />
        <IconButton icon={<Icon.Target />} text="Ecchi" />
        <IconButton icon={<Icon.Users />} text="Slice of Life" />
        <IconButton icon={<Icon.Activity />} text="Sci-Fi" />
        <IconButton icon={<Icon.CloudLightning />} text="Supernatural" />
        <IconButton icon={<Icon.Shield />} text="Thriller" />
        <IconButton icon={<Icon.Box />} text="Mystery" />
        <IconButton icon={<Icon.Zap />} text="Sports" />
      </div>
    </div>
  );
};

export default GenreSelect;
