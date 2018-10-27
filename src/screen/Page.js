import React from 'react'
import PropTypes from 'prop-types'
import { Context } from '../context'

export default class Page extends React.Component{

    constructor(props,contet){
        super(props.context)
    }

    static contextTypes = {
        address: PropTypes.string
    }

    render () {
        return <Context.Consumer>
          {
              context=>(
                <div>
                  {console.log(context)}
                  页面组件
                </div>
              )
          }
        </Context.Consumer>
    }
}