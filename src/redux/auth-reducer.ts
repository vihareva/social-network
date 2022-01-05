import { Dispatch } from "redux";
import {authAPI} from "../api/api";
import { AppThunk} from "./redux-store";
import {setAppErrorAC} from "./app-reducer";

export type authDataType={
    id: null|number,
    email: null|string,
    login: null|string,
    isAuth: boolean
}

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};

type SetAuthUserDataActionType= {
    type: 'SET_USER_DATA',
    data:authDataType
}

const authReducer = (state:authDataType = initialState, action:AuthActionsType) => {
    switch (action.type) {
        case 'SET_USER_DATA':

            return {
                ...state,
                ...action.data
            }

        default:
            return state;
    }
}

export const setAuthUserData = (id: null|number, email: null|string, login: null|string, isAuth: boolean):SetAuthUserDataActionType =>{
    return {
        type: 'SET_USER_DATA',
        data: {id, email, login, isAuth}
    }
}

export const getAuthUserData = () => (dispatch:Dispatch) => {
    return authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login}=response.data.data;
                dispatch(setAuthUserData(id, email, login, true)) ;
            }
        });
}

export const login=(email: string, password: string, rememberMe: boolean): AppThunk =>{
    return (dispatch)=>{
        authAPI.login(email,password,rememberMe)
            .then(resp=>{
                if (resp.data.resultCode === 0) {
                    dispatch(getAuthUserData()) ;
                }else{
                    if (resp.data.messages.length){
                        dispatch(setAppErrorAC(resp.data.messages[0]))
                    }
                }
            })
    }
}
export const logout=(): AppThunk =>{
    return (dispatch)=>{
        authAPI.logout()
            .then(resp=>{
                if (resp.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false)) ;
                }
            })
    }
}

export type AuthActionsType=SetAuthUserDataActionType;

export default authReducer;