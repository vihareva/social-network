import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {AppThunk} from "./redux-store";
import {ProfileDescriptionFormDataType} from "../components/Profile/ProfileInfo/ProfileDescriptionForm";
import {v1} from "uuid";
import {toggleIsFetching} from "./users-reducer";

export type postDataType = {
    id: string
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

type setUserStatusActionType = ReturnType<typeof setUserStatus>
type AddPostActionType = {
    type: "ADD-POST",
    postMessage: string
    date: string
}
type UpdateNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    newPostText: string
}
type setProfileActionType = {
    type: 'SET_USER_PROFILE',
    profile: ProfileType
}
type updatePhotoActionType = ReturnType<typeof updatePhotoAC>
type updateUserStatusActionType = ReturnType<typeof updateStatusAC>

export type ProfileActionType = AddPostActionType
    | UpdateNewPostTextActionType
    | setProfileActionType
    | setUserStatusActionType
    | updateUserStatusActionType
    | updatePhotoActionType

let initialState = {
    messageForNewPost: '',
    postData: [
        {id: v1(), message: 'Hi, how are you?', likesCount: 12, date: '18.06.2021 at 18:25 '},
        {id: v1(), message: 'It\'s my first post', likesCount: 11, date: '04.05.2021 at 21:50'},
        {id: v1(), message: 'I am so fine today', likesCount: 11, date: '28.07.2021 at 04:17'}
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
                    {id: v1(), message: action.postMessage, likesCount: 0, date: action.date},
                    ...state.postData
                ],
                messageForNewPost: ''
            }
        case "UPDATE-NEW-POST-TEXT":
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
        case "UPDATE_PHOTO": {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state;
    }
}

export let addPost = (postMessage: string, date: string): AddPostActionType => {
    return {type: "ADD-POST", postMessage, date}
}
export let updateNewPostText = (text: string): UpdateNewPostTextActionType => {
    return {type: "UPDATE-NEW-POST-TEXT", newPostText: text}
}

export let setUserProfile = (profile: ProfileType): setProfileActionType => {
    return {type: "SET_USER_PROFILE", profile}
}
export let setUserStatus = (status: string) => {
    return {type: "SET_USER_STATUS", status} as const
}
export let updatePhotoAC = (photos: photosType) => {
    return {type: "UPDATE_PHOTO", photos} as const
}
export let updateStatusAC = (status: string) => {
    return {type: "UPDATE_USER_STATUS", status} as const
}

export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
    dispatch(toggleIsFetching(false));
}

export const getUserStatus = (userId: number) => async (dispatch: Dispatch) => {
    let response = await usersAPI.getStatus(userId);
    dispatch(setUserStatus(response.data));
}

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

export const updatePhoto = (file: File) => async (dispatch: Dispatch) => {
    let resp = await usersAPI.updatePhoto(file)
    if (resp.data.resultCode === 0) {
        dispatch(updatePhotoAC(resp.data.data.photos));
    }
}
