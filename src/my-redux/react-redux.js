import React from "react";
import { bindActionCreators } from '../my-redux'

const Context = React.createContext({});

/*
* 利用新版本的react的context Api 重写connect函数与 Provider组件
* */

export const connect = (mapStateToProps, mapDispatchToProps={})=>WarpComponent=>{
  return class ConnectComponent {
    render(){
      return (
        <Context.Consumer>
          {
            context=>{
              const {store, dispatch} = context
              const filterProps = {dispatch}
              const dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
              if ( mapStateToProps ) {
                Object.assign(filterProps, mapStateToProps(store))
              }
              if( mapDispatchToProps ){
                Object.assign(filterProps, dispatchProps)
              }
              return (
                <WarpComponent {...filterProps} />
              )
            }
          }
        </Context.Consumer>
      )
    }
  }
}

export default class Provider extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      store: props.store.getState(),
      dispatch: props.store.dispatch
    }
    props.store.subscribe(this.update)
  }
  update=()=> {
    this.setState({
      store: this.props.store.getState()
    })
  }
  render(){
    return (
      <Context.Provider>
        {this.props.children}
      </Context.Provider>
    )
  }
}