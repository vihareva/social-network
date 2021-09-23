import {actionTypes, profilePageType} from "./state";

type AddPostActionType=ReturnType<typeof addPostActionCreator>

type UpdateNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    newPostText: string
}


export type ProfileActionType = AddPostActionType
    | UpdateNewPostTextActionType


export let addPostActionCreator=(postMessage: string)=>{
    return {type: "ADD-POST", postMessage: postMessage} as const
}

export let updateNewPostTextActionCreator=(text: string):UpdateNewPostTextActionType => {
    return {type: "UPDATE-NEW-POST-TEXT", newPostText: text}
}



export const profileReducer = (state: profilePageType, action: actionTypes) => {
    switch (action.type) {
        case 'ADD-POST':
            let newPost = {
                id: 4,
                message: action.postMessage,
                likesCount: 0
            }
            state.postData.push(newPost);
            state.messageForNewPost = '';
            return state;

        case "UPDATE-NEW-POST-TEXT":
            state.messageForNewPost = action.newPostText;
            return state;
        default:
            return state;
    }


}