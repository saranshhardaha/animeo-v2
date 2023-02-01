import React, { Component } from 'react';

class LogoSection extends Component {
  render() {
    return (
      <div className='h-32 grid place-items-center'>
        <div className='flex gap-2 items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E97451" className="w-5 h-5">
            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
          </svg>
          <p className='font-extrabold text-xl'>Markd</p>
        </div>
      </div>
    );
  }
}

export default LogoSection;