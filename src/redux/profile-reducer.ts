// import {actionTypes, profilePageType} from "./state";
export type postDataType = {
    id: number
    message: string
    likesCount: number
}

export type profilePageType = {
    messageForNewPost: string,
    postData: Array<postDataType>
    profile: null | ProfileType
}

export type ProfileType={
    photos:{small: string, large: string},
    //userId: number
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts:{
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

//type AddPostActionType=ReturnType<typeof addPostActionCreator>
type AddPostActionType = {
    type: "ADD-POST",
    postMessage: string
}
type UpdateNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    newPostText: string
}
type setProfileActionType={
    type:'SET_USER_PROFILE',
    profile:ProfileType
}
export type ProfileActionType = AddPostActionType
    | UpdateNewPostTextActionType
    | setProfileActionType


let initialState = {
    messageForNewPost: '',
    postData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11,},
        {id: 3, message: 'I am so fine today', likesCount: 11,}
    ],
    profile: null
}
export const profileReducer = (state: profilePageType = initialState, action: ProfileActionType): profilePageType => {
    switch (action.type) {
        case 'ADD-POST':
            // let newPost = {
            //     id: 4,
            //     message: action.postMessage,
            //     likesCount: 0
            // }
            // state.postData.push(newPost);
            // state.messageForNewPost = '';
            // return state;
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
        case 'SET_USER_PROFILE':{
            return {...state, profile: action.profile}
        }
        default:
            return state;
    }
}

export let addPostActionCreator = (postMessage: string): AddPostActionType => {
    return {type: "ADD-POST", postMessage: postMessage}
    //as const
}

export let updateNewPostTextActionCreator = (text: string): UpdateNewPostTextActionType => {
    return {type: "UPDATE-NEW-POST-TEXT", newPostText: text}
}
export let setUserProfile= (profile:ProfileType): setProfileActionType => {
    return {type: "SET_USER_PROFILE", profile}
}