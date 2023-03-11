import React from "react";

class OverlaySearch extends React.Component {
  render() {
    return (
      <>
        <div className="hidden z-20 place-items-center absolute h-full w-full bg-black/80 backdrop-blur">
          <div className="flex gap-1 bg-white/20 backdrop-blur">
            <input type="text" name="" id="" className="text-black bg-transparent" />
          </div>
        </div>
      </>
    );
  }
}

export default OverlaySearch;
