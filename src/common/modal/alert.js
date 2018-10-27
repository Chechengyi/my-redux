import React from 'react'
import ReactDom from 'react-dom'
import Modal from "./Modal";

export default function alert() {
  const div = document.createElement('div')
  document.body.appendChild(div)

  function close(){
    ReactDom.unmountComponentAtNode(div)
    if ( div && div.parentNode ) {
      div.parentNode.removeChild(div)
    }
  }

  ReactDom.render(
    <Modal/>,
    div
  )

}