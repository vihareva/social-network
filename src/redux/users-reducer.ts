import {usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

let initialState = {
    users: [],
    pageSize: 12,
    totalUsersCount: 0,
    currentPageNumber: 1,
    isFetching: true,
    followingInProgressIDs: [],
    newPortionNumber: 1
};

export type UserType = {
    id: number,
    photos: { small: string, large: string },
    followed: boolean,
    name: string,
    status: string,
    location: {
        city: string,
        country: string
    }
}
export type usersStateType = {
    users: Array<UserType>
    pageSize: number,
    totalUsersCount: number,
    currentPageNumber: number,
    isFetching: boolean
    followingInProgressIDs: number[],
    newPortionNumber: number
}

type setUsersActionType = {
    type: 'SET_USERS',
    users: Array<UserType>
}
type setCurrentPageActionType = {
    type: 'SET_CURRENT_PAGE',
    currentPageNumber: number
}
type setTotalUsersCountActionType = {
    type: 'SET_TOTAL_USERS_COUNT',
    totalUsersCount: number,
}
type ToggleIsFetchingActionType = {
    type: 'TOGGLE_IS_FETCHING',
    isFetching: boolean
}
type ToggleFollowingProgressActionType = {
    type: 'TOGGLE_FOLLOWING_PROGRESS'
    isFetching: boolean
    userId: number
}

type UsersActionType = FollowUnfollowActionType
    | setUsersActionType
    | setCurrentPageActionType
    | setTotalUsersCountActionType
    | ToggleIsFetchingActionType
    | ToggleFollowingProgressActionType

const usersReducer = (state: usersStateType = initialState, action: UsersActionType): usersStateType => {
    switch (action.type) {
        case "FOLLOW_UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: action.isFollowed}
                    }
                    return u;
                })
            }
        case 'SET_USERS': {
            return {...state, users: action.users}
        }
        case "SET_TOTAL_USERS_COUNT": {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case "SET_CURRENT_PAGE": {
            return {...state, currentPageNumber: action.currentPageNumber}
        }
        case "TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "TOGGLE_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgressIDs: action.isFetching
                    ? [...state.followingInProgressIDs, action.userId]
                    : state.followingInProgressIDs.filter(id => id !== action.userId)
            }
        }

        default:
            return state;
    }
}


export const followUnfollow = (userId: number, isFollowed: boolean) => ({type: 'FOLLOW_UNFOLLOW', userId, isFollowed} as const)
type FollowUnfollowActionType=ReturnType<typeof followUnfollow>

export const setUsers = (users: Array<UserType>): setUsersActionType => ({type: 'SET_USERS', users})
export const setCurrentPage = (currentPageNumber: number): setCurrentPageActionType => ({
    type: 'SET_CURRENT_PAGE',
    currentPageNumber
})
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => ({
    type: 'SET_TOTAL_USERS_COUNT',
    totalUsersCount
})
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: 'TOGGLE_IS_FETCHING',
    isFetching
})
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({
    type: 'TOGGLE_FOLLOWING_PROGRESS',
    isFetching,
    userId
})

export type ThunkType = ThunkAction<void, AppStateType, unknown, UsersActionType>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true));

        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(toggleIsFetching(false));

    }
}


export const follow = (userId: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));

        let data = await usersAPI.follow(userId)
        if (data.resultCode == 0) {
            dispatch(followUnfollow(userId, true));
        }
        dispatch(toggleFollowingProgress(false, userId));

    }
}
export const unfollow = (userId: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));

        let data = await usersAPI.unfollow(userId)
        if (data.resultCode == 0) {
            dispatch(followUnfollow(userId, false));
        }
        dispatch(toggleFollowingProgress(false, userId));
    }
}



export default usersReducer;
