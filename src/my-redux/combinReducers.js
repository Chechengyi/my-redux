
/*
*  组合reducer，  接受的参数是一个对象， 键为reducer， 值是函数
*  然后这个函数返回了一个函数 combination，
*  利用闭包记录了 finalReducers（有那一些reducer）
*  combinReducers执行一次后， 也就是 返回的函数combination被当作参数传递给了createStore
*  也就是说， createStore里dispatch执行的reducer实际上是这个函数。
*  这个函数会把所有的reducer都执行一遍， action.type匹配了的， 就返回了新的状态，
*  action.type 没有匹配的，返回的就是原始的状态，最终返回的是一整颗的状态树
* */


export default function combineReducers(reducers) {
    let finalReducers = {}
    Object.keys(reducers).forEach( (item, i)=>{
        finalReducers[item] = reducers[item]
    } )
    let finalReducersKeys = Object.keys(finalReducers)
    return function combination( state={}, action ){
        let hasChange = false
        let nextState = {}
        for ( let i=0; i<finalReducersKeys.length; i++ ) {
            const key = finalReducersKeys[i]
            const reducer = finalReducers[key]
            const prevStateForKey = state[key]
            const nextStateForKey = reducer(prevStateForKey, action)
            nextState[key] = nextStateForKey
            hasChange = hasChange || prevStateForKey !== nextStateForKey
        }
        return hasChange? nextState : state
    }
}
