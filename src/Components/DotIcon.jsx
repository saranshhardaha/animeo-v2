import React, { Component } from 'react'

export class DotIcon extends Component {
  render() {
    return <div className={this.props.Dark ? "text-black" : "text-white/50"}>•</div>;
  }
}

export default DotIcon