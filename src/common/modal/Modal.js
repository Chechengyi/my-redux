import React, { Component } from 'react'

export default class Modal extends Component{
  render(){
    return (
      <div style={styles}>
        modal
      </div>
    )
  }
}

const styles = {
  position: 'fixed',
  width: 300,
  height: 300,
  top: '50%',
  left: '50%',
  marginTop: -150,
  marginLeft: -150,
  backgroundColor: 'red'
}