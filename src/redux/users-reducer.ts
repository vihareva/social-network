let initialState = {
    users: [ ]
};

export type UserType={
    id: number,
    photoUrl: string,
    followed: boolean,
    fullName: string,
    status: string,
    location: {
        city: string,
        country: string
    }
}
export type usersStateType ={
    users: Array<UserType>
}

type followUserActionType={
    type: 'FOLLOW',
    userId: number
}
type unfollowUserActionType={
    type: 'UNFOLLOW',
    userId: number
}
type setUsersActionType={
    type: 'SET_USERS',
    users: Array<UserType>
}

type UsersActionType=followUserActionType|unfollowUserActionType|setUsersActionType

const usersReducer = (state:usersStateType = initialState, action:UsersActionType): usersStateType => {
    switch(action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map( u =>  {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map( u =>  {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case 'SET_USERS': {
            return { ...state, users: [ ...state.users, ...action.users ]}
        }
        default:
            return state;
    }
}


export const followAC = (userId: number):followUserActionType => ({type: 'FOLLOW', userId })
export const unfollowAC = (userId: number):unfollowUserActionType => ({type: 'UNFOLLOW', userId })
export const setUsersAC = (users: Array<UserType>):setUsersActionType => ({type: 'SET_USERS', users })

export default usersReducer;