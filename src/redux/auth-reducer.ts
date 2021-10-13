export type authDataType={
    userId: null|string,
    email: null|string,
    login: null|string,
    isAuth: boolean
}

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

type SetAuthUserDataActionType= {
    type: 'SET_USER_DATA',
    data:authDataType
}

const authReducer = (state:authDataType = initialState, action:SetAuthUserDataActionType) => {
    switch (action.type) {
        case 'SET_USER_DATA':

            return {
                ...state,
                ...action.data,
                isAuth: true
            }

        default:
            return state;
    }
}

export const setAuthUserData = (data:authDataType):SetAuthUserDataActionType => ({type: 'SET_USER_DATA', data })
export default authReducer;