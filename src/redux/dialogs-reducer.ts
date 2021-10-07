// import {actionTypes, messagesPageType} from "./state";

export type DialogsDataType = {
    id: number
    name: string
}

export type MessagesDataType = {
    id: number
    message: string
}

export type messagesPageType = {
    dialogsData: Array<DialogsDataType>
    messagesData: Array<MessagesDataType>
    newMessageText: string
}

let initialState = {
    dialogsData: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ],
    messagesData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 6, message: 'Hi'},
    ],
    newMessageText: ''
}

type  UpdateNewMessageTextActionType = {
    type: "UPDATE-NEW-MESSAGE-TEXT"
    newMessageText: string
}
type SendMessageActionType = {
    type: "SEND-MESSAGE"
}
export type DialogsActionType = UpdateNewMessageTextActionType | SendMessageActionType

export const dialogsReducer = (state: messagesPageType = initialState, action: DialogsActionType): messagesPageType => {
    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-TEXT":
            // state.newMessageText = action.newMessageText;
            // return state;
            return {...state, newMessageText: action.newMessageText}
        case 'SEND-MESSAGE':
            // let newMessage = state.newMessageText;
            // state.messagesData.push({id: 8, message: newMessage});
            // state.newMessageText = '';
            // return state;
            return {
                ...state,
                messagesData: [
                    ...state.messagesData,
                    {id: 8, message: state.newMessageText},
                ],
                newMessageText: ''
            }
        default:
            return state;
    }

}
export let updateNewMessageTextActionCreator = (text: string): UpdateNewMessageTextActionType => {
    return {type: "UPDATE-NEW-MESSAGE-TEXT", newMessageText: text}
}

export let sendMessageActionCreator = (): SendMessageActionType => {
    return {type: "SEND-MESSAGE"}
}