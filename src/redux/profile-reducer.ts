// import {actionTypes, profilePageType} from "./state";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

export type postDataType = {
    id: number
    message: string
    likesCount: number
}

export type profilePageType = {
    messageForNewPost: string,
    postData: Array<postDataType>
    profile: null | ProfileType
    status: string
}

export type ProfileType = {
    photos: { small: string, large: string },
    //userId: number
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: {
        github: string,
        vk: string,
        facebook: string,
        instagram: string,
        twitter: string,
        website: string,
        youtube: string,
        mainLink: string
    }

}

type AddPostActionType = {
    type: "ADD-POST",
    postMessage: string
}
type UpdateNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    newPostText: string
}
type DeletePostActionType = ReturnType<typeof deletePost>


export type ProfileActionType = AddPostActionType
    | UpdateNewPostTextActionType
    | setProfileActionType
    | setUserStatusActionType
    | updateUserStatusActionType
    | DeletePostActionType


let initialState = {
    messageForNewPost: '',
    postData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11,},
        {id: 3, message: 'I am so fine today', likesCount: 11,}
    ],
    profile: null,
    status: ''
}

export const profileReducer = (state: profilePageType = initialState, action: ProfileActionType): profilePageType => {
    switch (action.type) {
        case 'ADD-POST':
            return {
                ...state,
                postData: [
                    {id: 4, message: action.postMessage, likesCount: 0},
                    ...state.postData
                ],
                messageForNewPost: ''
            }
        case "UPDATE-NEW-POST-TEXT":
            // state.messageForNewPost = action.newPostText;
            // return state;
            return {...state, messageForNewPost: action.newPostText}
        case 'SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case "SET_USER_STATUS": {
            return {...state, status: action.status}
        }
        case "UPDATE_USER_STATUS": {
            return {...state, status: action.status}
        }
        case "DELETE-POST": {
            return {...state, postData: state.postData.filter(p => p.id !== action.id)}
        }
        default:
            return state;
    }
}

export let addPostActionCreator = (postMessage: string): AddPostActionType => {
    return {type: "ADD-POST", postMessage: postMessage}
}
export let deletePost = (id: number) => {
    return {type: "DELETE-POST", id} as const
}

export let updateNewPostTextActionCreator = (text: string): UpdateNewPostTextActionType => {
    return {type: "UPDATE-NEW-POST-TEXT", newPostText: text}
}


type setProfileActionType = {
    type: 'SET_USER_PROFILE',
    profile: ProfileType
}
export let setUserProfile = (profile: ProfileType): setProfileActionType => {
    return {type: "SET_USER_PROFILE", profile}
}
export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}


export let setUserStatus = (status: string) => {
    return {type: "SET_USER_STATUS", status} as const
}
type setUserStatusActionType = ReturnType<typeof setUserStatus>
export const getUserStatus = (userId: number) => async (dispatch: Dispatch) => {
    let response = await usersAPI.getStatus(userId);
    dispatch(setUserStatus(response.data));
}

export let updateStatusAC = (status: string) => {
    return {type: "UPDATE_USER_STATUS", status} as const
}
type updateUserStatusActionType = ReturnType<typeof updateStatusAC>
export const updateUserStatus = (status: string) => async (dispatch: Dispatch) => {
    let resp = await usersAPI.updateStatus(status)
    if (resp.data.resultCode === 0) {
        dispatch(updateStatusAC(status));
    }
}
