
// applyMiddleware 调用片段

// const midApi = {
//     getState: store.getState,
//     dispatch: (...args)=>dispatch(...args)
// }
// dispatch = middleware(midApi)(store.dispatch)

// thunk利用闭包保存了 dispatch和getState， 然后第二层 next是传入的是store.dispatch
// 第三层 action  就是在实际的使用中传入的了。 这里会做一个判断， 如果传入的是对象
// 那直接返回调用 next(action) next即下一个中间件， 如果没有中间件了，这里就是store.dispatch了，
// 这样与普通的使用没有区别
// 如果传入的是函数的话， 则返回执行传入的函数，并将 dispatch和getState作为参数传递进去
//    这样就可以在里面执行异步的操作了
export const thunk = ({dispatch, getState})=>next=>action=> {
    console.log('..thunk')
    console.log(next)
    if (typeof action === 'function' ) {
        return action(dispatch, getState)
    }
    return next(action)
}

export const ceshi = ({dispatch, getState})=>next=>action=> {
    console.log('...ceshi')
    console.log(next)
    if (typeof action === 'function' ) {
        // return action(dispatch, getState)
        return action(dispatch, getState)
    }
    return next(action)
}
