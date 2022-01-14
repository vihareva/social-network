import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {AppThunk} from "./redux-store";
import {setAppErrorAC} from "./app-reducer";

export type authDataType = {
    id: null | number,
    email: null | string,
    login: null | string,
    isAuth: boolean,
    captcha: string | null
}

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
};


const authReducer = (state: authDataType = initialState, action: AuthActionsType): authDataType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case "SET_CAPTCHA_URL":
            return {
                ...state,
                ...action.data
            }

        default:
            return state;
    }
}

export const setAuthUserData = (id: null | number, email: null | string, login: null | string, isAuth: boolean) => {
    return {
        type: 'SET_USER_DATA',
        data: {id, email, login, isAuth}
    } as const
}
type SetAuthUserDataActionType = ReturnType<typeof setAuthUserData>
export const getAuthUserData = () => (dispatch: Dispatch) => {
    return authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        });
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): AppThunk => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe, captcha)
            .then(resp => {
                if (resp.data.resultCode === 0) {
                    dispatch(getAuthUserData());
                } else {
                    if (resp.data.resultCode === 10) {
                        dispatch(getCaptchaUrl())
                    }
                    if (resp.data.messages.length) {
                        dispatch(setAppErrorAC(resp.data.messages[0]))
                    }
                }
            })
    }
}

export const setCaptchaUrl = (captcha: string) => {
    return {
        type: 'SET_CAPTCHA_URL',
        data: {captcha}
    } as const
}
type setCaptchaUrlActionType = ReturnType<typeof setCaptchaUrl>

export const getCaptchaUrl = (): AppThunk => {
    return (dispatch) => {
        authAPI.getCaptchaUrl()
            .then(resp => {
                dispatch(setCaptchaUrl(resp.data.url));
            })
    }
}

export const logout = (): AppThunk => {
    return (dispatch) => {
        authAPI.logout()
            .then(resp => {
                if (resp.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false));
                }
            })
    }
}

export type AuthActionsType = SetAuthUserDataActionType | setCaptchaUrlActionType;

export default authReducer;