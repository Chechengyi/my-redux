import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from '../my-redux'

const Context = React.createContext({});

/*
* 旧版本的context Api 编写的 connect函数与 Provider组件
* */


// 连接redux和react的一个高阶组件
export const connect = ( mapStateToProps, mapDispatchToProps={} )=>(WarpComponent)=> {
    return class ConnectComponent extends React.Component{
        static contextTypes = {
            store: PropTypes.object
        }
        constructor(props, context){
            super(props, context)
            // 从context中获取store
            const {store} = context
            // 将传入的 mapDispatchToProps
            const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
            this.state = {
                props: {
                    ...mapStateToProps(store.getState()),
                    dispatch: store.dispatch,
                    ...dispatchProps
                }
            }
        }
        componentDidMount(){
            const {store} = this.context
            // 订阅，  每次dispathch的时候就执行更新操作， 以将最新的store更新到子组件
            store.subscribe(()=>this.update())
            // this.update()
            // 之前是在componentDidMount中执行了 获取store， 赋值给this.state.props
            // 的操作，在componentDidMount之前 自组件的render方法就执行了， 子组件的
            // componentDidMount方法也比父组件先执行。 所以放到这里面去执行的话，
            // 在子组件的componentDidMount方法中就获取不到store以及dispatch，
            // 所以吧赋值的操作放到 constructor 中去执行
        }
        update =()=> {
            const {store} = this.context
            // const dispatch = store.dispatch
            const stateProps = mapStateToProps(store.getState())
            this.setState({
                props: {
                    ...this.state.props,
                    ...stateProps,
                }
            })
        }
        render(){
            return <WarpComponent {...this.state.props} />
        }
    }
}

//
export default class Provider extends React.Component{
    // 使用context要预先定义类型了这里吧 store定义为了object类型
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext(){
        return {
            // 设置context.store = this.store
            store: this.store
        }
    }
    constructor(props, context){
        super(props, context)
        // 给this.store赋值为外面传进来的 store的值
        this.store = props.store
    }
    render(){
        return this.props.children
    }
}


