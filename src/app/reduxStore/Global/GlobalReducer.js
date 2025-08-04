import { CHANGE_LANGUAGE, CHANGE_LANGUAGUE, CHANGE_TOKEN } from "./GlobalActionsTypes"

const initialState = {
    lang:'en',
    token:localStorage.getItem('token')?localStorage.getItem('token'):null,
}

const GlobalReducer = (state = initialState ,action)=>{
    switch (action.type){
        case CHANGE_LANGUAGE :{
            return {
                ...state,
                lang:action.lang
            }
        }
        case CHANGE_TOKEN :{
            return {
                ...state,
                token:action.token
            }
        }
        case CHANGE_LANGUAGUE :{
            return {
                ...state,
                lang:action.code
            }
        }
        default: return state;
    }
}

export default GlobalReducer