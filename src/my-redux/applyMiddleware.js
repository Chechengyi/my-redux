import compose from './compose'


// export default function applyMiddleware(middleware){
//     return createStore => (...args) => {
//         const store = createStore(...args)
//         let dispatch = store.dispatch
//
//         const midApi = {
//             getState: store.getState,
//             dispatch: (...args)=>dispatch(...args)
//         }
//         dispatch = middleware(midApi)(store.dispatch)
//         return {
//             ...store,
//             dispatch
//         }
//     }
// }

export default function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
        const store = createStore(...args)
        let dispatch = store.dispatch

        const midApi = {
            getState: store.getState,
            // dispatch: (...args)=>dispatch(...args)
            dispatch: store.dispatch
        }
        const middlewareChain = middlewares.map( middleware=>middleware(midApi) )
        // middlewareChain是一个其中每一项都为函数的数组，依照中间件的编码方式，这里存的
        // 函数的格式为： (midApi已经作为中间件函数的第一层{dispatch, getState}传递了进去)
        // next=>action=>
        // dispatch = middleware(midApi)(store.dispatch)
        dispatch = compose(...middlewareChain)(store.dispatch)
        // compose(...middleware) 返回的是 (...args)=>ret(item(...args))
        // store.dispatch作为参数传递了进去 即...args为store.dispatch
        return {
            ...store,
            dispatch
        }
    }
}