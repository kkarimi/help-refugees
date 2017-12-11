import React, { Component } from 'react'
import loading from './loading.svg'

class Callback extends Component {
  render () {
    const style = {
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white'
    }

    return (
      <div style={style}>
        <div>
          <img src={loading} alt="loading"/>
        </div>
        <div>
          {this.props.text}
        </div>
      </div>
    )
  }
}

export default Callback
