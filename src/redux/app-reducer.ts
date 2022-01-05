import {getAuthUserData} from "./auth-reducer";
import {AppThunk} from "./redux-store";

const initialState: InitialStateType = {
    error: null,
    isInitialized: false
}
export type InitialStateType = {
    error: string | null,
    isInitialized: boolean
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized:true}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = () => ({type: 'APP/SET-INITIALIZED'} as const)
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>
export type AppActionsType =
    | SetAppErrorActionType
    | SetIsInitializedActionType

export const initializeApp=():AppThunk=>{
    return (dispatch)=>{
      let promise= dispatch(getAuthUserData())
        //...dispatches
        //when all promises are resolved we'll initialize app
           Promise.all([promise]).then(()=>{
            dispatch(setIsInitializedAC())
        })

    }
}