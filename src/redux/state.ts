import {ProfileActionType, profileReducer} from "./profile-reducer";
import {DialogsActionType, dialogsReducer} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";

export type DialogsDataType = {
    id: number
    name: string
}

export type MessagesDataType = {
    id: number
    message: string
}

export type postDataType = {
    id: number
    message: string
    likesCount: number
}

export type messagesPageType = {
    dialogsData: Array<DialogsDataType>
    messagesData: Array<MessagesDataType>
    newMessageText: string
}

export type profilePageType = {
    messageForNewPost: string,
    postData: Array<postDataType>
}

export type StateType = {
    messagesPage: messagesPageType
    profilePage: profilePageType
    sidebar: any
}
export type actionTypes=ProfileActionType|DialogsActionType

export type StoreType = {
    _state: StateType
    _onChange: () => void
    subscribe: (observer: () => void) => void
    getState: () => StateType
    dispatch: (action: actionTypes)=>void
}

export const store: StoreType = {
    _state: {
        messagesPage: {
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
        },
        profilePage: {
            messageForNewPost: '',
            postData: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'It\'s my first post', likesCount: 11,},
                {id: 3, message: 'I am so fine today', likesCount: 11,}
            ]
        },
        sidebar:{}

    },

    _onChange() {
        console.log('state changed')
    },

    subscribe(observer) {
        this._onChange = observer
    },

    getState() {
        return this._state
    },

  dispatch(action){
      this._state.profilePage=profileReducer(this._state.profilePage, action)
      this._state.messagesPage=dialogsReducer(this._state.messagesPage, action)
      this._state.sidebar=sidebarReducer(this._state.sidebar, action)

      this._onChange();
  }

}


