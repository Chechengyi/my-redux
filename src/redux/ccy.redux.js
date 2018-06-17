// 操作
const ADD_AGE = 'ADD_AGE'
const REMOVE_AGE = 'REMOVE_AGE'



const initalState = {
	name: 'Chechengyi',
	age: 22
}
const handlers = {
	[ADD_AGE]: (state, action)=>{
		return {
			age: state.age + 1
		}
	},
	[REMOVE_AGE]: (state, action)=> {
		return {
			age: state.age -1
		}
	}
}
// reducer

function createReducer (initState, handlers){
	return function ( state=initState, action ) {
		const handler = handlers[action.type]
		if (!handler) return {...state}
		return {...state, ...handler(state, action)}
	}
}

export const user = createReducer(initalState, handlers)
// console.log(user)
// export default createReducer(initalState, handlers)

// export function user( state=initalState, action ) {
// 	switch (action.type) {
//         case ADD_AGE:
// 			return { ...state, age:state.age+1 }
// 		case REMOVE_AGE:
// 			return { ...state, age:state.age-1 }
//         default:
// 			return state
// 	}
// }

export function addAge(){
	return { type: ADD_AGE }
}

export function removeAge(){
	return { type: REMOVE_AGE }
}

export function timeAge(){
    return async (dispatch, getState) => {
        // console.log(getState())
        // setTimeout( ()=> {
        //     dispatch({type: ADD_AGE})
        // },2000 )
        await new Promise( (reslove, reject)=>{
			setTimeout(()=>{ reslove('ok') },1000)
        } )
        dispatch({type: ADD_AGE})
    }
}