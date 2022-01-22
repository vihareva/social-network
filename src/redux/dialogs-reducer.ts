import {v1} from "uuid";

export type DialogsDataType = {
    id: string
    name: string
}

export type MessagesDataType = {
    id: string
    message: string
}

export type messagesPageType = {
    dialogsData: Array<DialogsDataType>
    messagesData: { [key: string]: Array<MessagesDataType> }
}
let id1=v1();
let id2=v1();
let id3=v1();

let initialState = {
    dialogsData: [
        {id: id1, name: 'Dimych'},
        {id: id2, name: 'Andrew'},
        {id: id3, name: 'Sveta'},
        // {id: v1(), name: 'Sasha'},
        // {id: v1(), name: 'Viktor'},
        // {id: v1(), name: 'Valera'}
    ],
    messagesData: {
        [id1]: [
            {id: v1(), message: 'Hi'},
            {id: v1(), message: 'How is your it-kamasutra?'},
            {id: v1(), message: 'Yo'},
            {id: v1(), message: 'Yo'},
            {id: v1(), message: 'Yo'},
            {id: v1(), message: 'Hgfdgdsfgsgsdfi'},
        ],
        [id2]: [
            {id: v1(), message: 'Hi'},
            {id: v1(), message: 'How is your it-kamasutra?'},
            {id: v1(), message: 'Ysdfsdfsdo'},
            {id: v1(), message: 'Yo'},
            {id: v1(), message: 'Yo'},
            {id: v1(), message: 'Hi'},
        ],
        [id3]: [
            {id: v1(), message: 'Hi'},
            {id: v1(), message: 'How is your it-kamasutra?'},
            {id: v1(), message: 'Yo'},
            {id: v1(), message: 'Yhhhhhhhhhhhho'},
            {id: v1(), message: 'Yo'},
            {id: v1(), message: 'Hi'},
        ],

    }
}


export type DialogsActionType =  SendMessageActionType

export const dialogsReducer = (state: messagesPageType = initialState, action: DialogsActionType): messagesPageType => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            return  {
                ...state,
                messagesData: {
                    ...state.messagesData,
                    [action.userId]: [...state.messagesData[action.userId], {id: v1(), message: action.message}]
                }
            }

        default:
            return state;
    }

}

export let sendMessageActionCreator = (message: string, userId: string) => {
    return {type: "SEND-MESSAGE", message, userId} as const
}
type SendMessageActionType=ReturnType<typeof sendMessageActionCreator>