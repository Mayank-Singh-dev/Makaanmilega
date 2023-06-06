export const actionType = {
    SET_USER:'SET_USER',
    SET_BUILDING:'SET_BUILDING'
}

const reducer=(state,action)=>{
    console.log(action)

    switch(action.type){
       case actionType.SET_USER:
        return{
            ...state,
            user:action.user,
        }
        case actionType.SET_BUILDING:
        return{
            ...state,
            buildingItems:action.buildingItems,
        }
        default:
            return state
    }
}

export default reducer