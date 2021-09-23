import {actionTypes, messagesPageType} from "./state";
type  UpdateNewMessageTextActionType={
    type: "UPDATE-NEW-MESSAGE-TEXT"
    newMessageText: string
}
type SendMessageActionType={
    type: "SEND-MESSAGE"
}
export type DialogsActionType= UpdateNewMessageTextActionType |SendMessageActionType

export let  updateNewMessageTextActionCreator=(text: string):UpdateNewMessageTextActionType => {
    return {type: "UPDATE-NEW-MESSAGE-TEXT", newMessageText: text}
}

export let sendMessageActionCreator =():SendMessageActionType => {
    return {type: "SEND-MESSAGE"}
}
export const dialogsReducer = (state: messagesPageType, action: actionTypes) => {
    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-TEXT":
            state.newMessageText = action.newMessageText;
            return state;
        case 'SEND-MESSAGE':
            let newMessage = state.newMessageText;
            state.messagesData.push({id: 8, message: newMessage});
            state.newMessageText = '';
            return state;
        default:
            return state;
    }

}