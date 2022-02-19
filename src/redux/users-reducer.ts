import {usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppThunk} from "./redux-store";

let initialState = {
    users: [],
    pageSize: 12,
    totalUsersCount: 0,
    currentPageNumber: 1,
    isFetching: true,
    followingInProgressIDs: [],
    newPortionNumber: 1,
    filter: {
        term: '',
        friend: null
    }
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

export type FilterUsersDataType = {
    term: string,
    friend: null |boolean
}

export type usersStateType = {
    users: Array<UserType>
    pageSize: number,
    totalUsersCount: number,
    currentPageNumber: number,
    isFetching: boolean
    followingInProgressIDs: number[],
    newPortionNumber: number,
    filter: FilterUsersDataType
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
type setFilterActionType = ReturnType<typeof setFilter>
type FollowUnfollowActionType = ReturnType<typeof followUnfollow>

export type UsersActionsType = FollowUnfollowActionType
    | setUsersActionType
    | setCurrentPageActionType
    | setTotalUsersCountActionType
    | ToggleIsFetchingActionType
    | ToggleFollowingProgressActionType
    | setFilterActionType

const usersReducer = (state: usersStateType = initialState, action: UsersActionsType): usersStateType => {
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
        case "SET_FILTER": {
            return {...state, filter: action.filter}
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


export const followUnfollow = (userId: number, isFollowed: boolean) => ({
    type: 'FOLLOW_UNFOLLOW',
    userId,
    isFollowed
} as const)
export const setUsers = (users: Array<UserType>): setUsersActionType => ({type: 'SET_USERS', users})
export const setCurrentPage = (currentPageNumber: number): setCurrentPageActionType => ({
    type: 'SET_CURRENT_PAGE',
    currentPageNumber
})
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => ({
    type: 'SET_TOTAL_USERS_COUNT',
    totalUsersCount
})
export const setFilter = (filter: FilterUsersDataType) => ({
    type: 'SET_FILTER',
    filter
} as const)
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: 'TOGGLE_IS_FETCHING',
    isFetching
})
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({
    type: 'TOGGLE_FOLLOWING_PROGRESS',
    isFetching,
    userId
})


export const getUsers = (currentPage: number, pageSize: number, filter:FilterUsersDataType): AppThunk => {
    return async (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true));

        let data = await usersAPI.getUsers(currentPage, pageSize, filter)
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(setFilter(filter));
        dispatch(toggleIsFetching(false));
    }
}

export const follow = (userId: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));

        let data = await usersAPI.follow(userId)
        if (data.resultCode === 0) {
            dispatch(followUnfollow(userId, true));
        }
        dispatch(toggleFollowingProgress(false, userId));

    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));

        let data = await usersAPI.unfollow(userId)
        if (data.resultCode === 0) {
            dispatch(followUnfollow(userId, false));
        }
        dispatch(toggleFollowingProgress(false, userId));
    }
}

export default usersReducer;
