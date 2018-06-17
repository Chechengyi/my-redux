

function bindActionCreator(creator, dispatch){
    return (...args)=> dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
    // let bound = {}
    // Object.keys(creators).forEach( v=>{
    //     let creator = creators[v]
    //     bound[v] = bindActionCreator(creator, dispatch)
    // } )
    // return bound

    return Object.keys(creators).reduce( (ret,item)=>{
        ret[item] = bindActionCreator(creators[item], dispatch)
        return ret
    }, {} )

    // 第一次执行的时候，  ret 为一个空对象， item 为Object.keys之后数组里面第一个元素
    // 第二次执行的时候， 前面的return了 ret， 第二次执行的时候传入的ret已经是一个拥有一个键
    // 即Object.keys之后数组里面第一个元素， 值为creator[item]，后续亦然

}