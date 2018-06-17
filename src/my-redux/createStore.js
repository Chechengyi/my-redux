
export function createStore(reducer, enhancer){

    if (enhancer) {
        return enhancer(createStore)(reducer)
    }

    var currentState = {}
    var currentListeners = []
    function getState(){
        return currentState
    }
    function subscribe (listener){
        currentListeners.push(listener)
    }
    function dispatch (action){
        currentState = reducer(currentState, action)
        currentListeners.forEach( f=>f() )
        // return action
    }
    // 在初始化的时候传入一个特殊的 action， 所有都匹配不上，就返回了初始的状态树
    dispatch({type: '@CCY-REDUX'})
    return { getState, subscribe, dispatch }
}