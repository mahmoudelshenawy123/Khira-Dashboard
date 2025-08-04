import { CHANGE_LANGUAGE, CHANGE_LANGUAGUE, CHANGE_TOKEN  } from './GlobalActionsTypes' 


export const changeLanguageAction = (code)=>{
    return{
        type:CHANGE_LANGUAGE,
        lang:code
    }
}
export const changeToken = (token)=>{
    return{
        type:CHANGE_TOKEN,
        token:token
    }
}
export const chengeLang = (code)=>{
    return{
        type:CHANGE_LANGUAGUE,
        lang:code
    }
}