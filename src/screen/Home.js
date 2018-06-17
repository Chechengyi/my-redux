import React from 'react'
import { connect } from '../my-redux/react-redux'
import { addAge, removeAge, timeAge } from '../redux/ccy.redux'
import Page from './Page'
import PropTypes from 'prop-types'

// @connect( state=>({
//     name: state.user.name,
//     age: state.user.age
// }) )
class Home extends React.Component{

    constructor(props, context){
        super(props, context)
        this.state={
            address: '练习使用 context'
        }
    }

    static childContextTypes={
        address: PropTypes.string
    }

    getChildContext(){
        return {
            address: this.state.address
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    handleClick= type=> {
        if (type==='add') {
            // this.props.dispatch(addAge())
            this.props.addAge()
        } else if (type==='remove') {
            this.props.dispatch(removeAge())
        } else {
            this.props.dispatch(timeAge())
        }
    }

    render(){
        return <div>
            <div style={{textAlign: 'center'}} >
                {this.props.name}
            </div>
            <div style={{textAlign: 'center'}} >{this.props.age}</div>
            <div style={{textAlign: 'center'}} >
                <button onClick={ e=>this.handleClick('add') } >加</button>
                <button onClick={ e=>this.handleClick('remove') } >减</button>
                <button onClick={ e=>this.handleClick('time') } >过了很久</button>
            </div>
            <Page />
        </div>
    }
}

export default connect( state=>state.user, {addAge} )(Home)
// export default connect( state=>state.user )(Home)

