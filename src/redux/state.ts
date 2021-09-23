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
}
type AddPostActionType=ReturnType<typeof addPostActionCreator>

type UpdateNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    newPostText: string
}
type  UpdateNewMessageTextActionType={
    type: "UPDATE-NEW-MESSAGE-TEXT"
    newMessageText: string
}
type SendMessageActionType={
    type: "SEND-MESSAGE"
}

export type actionTypes = AddPostActionType
                        | UpdateNewPostTextActionType
                        | UpdateNewMessageTextActionType
                        |SendMessageActionType

export let addPostActionCreator=(postMessage: string)=>{
    return {type: "ADD-POST", postMessage: postMessage} as const
}

export let updateNewPostTextActionCreator=(text: string):UpdateNewPostTextActionType => {
    return {type: "UPDATE-NEW-POST-TEXT", newPostText: text}
}

export let  updateNewMessageTextActionCreator=(text: string):UpdateNewMessageTextActionType => {
    return {type: "UPDATE-NEW-MESSAGE-TEXT", newMessageText: text}
}

export let sendMessageActionCreator =():SendMessageActionType => {
    return {type: "SEND-MESSAGE"}
}

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
        }

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
      if (action.type === 'ADD-POST') {
          let newPost = {
              id: 4,
              message: action.postMessage,
              likesCount: 0
          }
          this._state.profilePage.postData.push(newPost);
          this._state.profilePage.messageForNewPost = ''
          this._onChange()
      }

      else if (action.type === "UPDATE-NEW-POST-TEXT") {
          this._state.profilePage.messageForNewPost = action.newPostText;
          this._onChange()
      }

      else if (action.type === "UPDATE-NEW-MESSAGE-TEXT") {
          this._state.messagesPage.newMessageText = action.newMessageText;
          this._onChange()
      }

      else if (action.type === 'SEND-MESSAGE') {
          let newMessage = this._state.messagesPage.newMessageText;
          this._state.messagesPage.messagesData.push({id: 8, message:newMessage })
          this._state.messagesPage.newMessageText = ''
          this._onChange()
      }
  }

}


