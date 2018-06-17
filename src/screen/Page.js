import React from 'react'
import PropTypes from 'prop-types'

export default class Page extends React.Component{

    constructor(props,contet){
        super(props.context)
    }

    static contextTypes = {
        address: PropTypes.string
    }

    render () {
        return <div>页面组件{this.context.address}</div>
    }
}