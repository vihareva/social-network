import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

import {AppThunk} from "./redux-store";
import {ProfileDescriptionFormDataType} from "../components/Profile/ProfileInfo/ProfileDescriptionForm";

export type postDataType = {
    id: number
    message: string
    likesCount: number
    date: string
}

export type profilePageType = {
    messageForNewPost: string,
    postData: Array<postDataType>
    profile: ProfileType
    status: string
}
export type photosType = {
    small: string
    large: string
}
export type ProfileType = {
    photos: photosType,
    userId: number
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    aboutMe: string,
    contacts: ContactsType
}
export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}
type AddPostActionType = {
    type: "ADD-POST",
    postMessage: string
    date: string
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
    | updatePhotoActionType


let initialState = {
    messageForNewPost: '',
    postData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12, date: '18.06.2021 at 18:25 '},
        {id: 2, message: 'It\'s my first post', likesCount: 11, date: '04.05.2021 at 21:50'},
        {id: 3, message: 'I am so fine today', likesCount: 11, date: '28.07.2021 at 04:17'}
    ],
    profile: {} as ProfileType,
    status: ''
}

export const profileReducer = (state: profilePageType = initialState, action: ProfileActionType): profilePageType => {
    switch (action.type) {
        case 'ADD-POST':
            return {
                ...state,
                postData: [
                    {id: 4, message: action.postMessage, likesCount: 0, date: action.date},
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
        case "UPDATE_PHOTO": {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        //{ profile: { photos: photosType };
        // messageForNewPost: string;
        // postData: Array<postDataType>;
        // status: string }
        default:
            return state;
    }
}

export let addPostActionCreator = (postMessage: string, date: string): AddPostActionType => {
    return {type: "ADD-POST", postMessage, date}
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

export const updateProfileDescription = (data: ProfileDescriptionFormDataType, id: number): AppThunk => async (dispatch) => {
    let resp = await usersAPI.updateProfileDescription(data)
    if (resp.data.resultCode === 0) {
        dispatch(getUserProfile(id));
    }
}

export let updatePhotoAC = (photos: photosType) => {
    return {type: "UPDATE_PHOTO", photos} as const
}
type updatePhotoActionType = ReturnType<typeof updatePhotoAC>

export const updatePhoto = (file: File) => async (dispatch: Dispatch) => {

    let resp = await usersAPI.updatePhoto(file)
    if (resp.data.resultCode === 0) {
        dispatch(updatePhotoAC(resp.data.data.photos));
    }
}
