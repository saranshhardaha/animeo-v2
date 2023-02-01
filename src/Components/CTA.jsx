import React, { Component } from 'react';

class CTA extends Component {
  render() {
    return (
      <div className='flex flex-col gap-4 text-center items-center justify-center'>
        <h1 className='font-bold text-2xl'>
          {this.props.Title}
        </h1>
        <p className='text-gray-600'>
          {this.props.Description}
        </p>
        <button className='px-5 p-2 bg-[#E97451] text-white rounded font-semibold delay-100 hover:bg-[#E97451]/90'>
          {this.props.ButtonText ?? "Submit"}
        </button>
      </div>
    );
  }
}

export default CTA;