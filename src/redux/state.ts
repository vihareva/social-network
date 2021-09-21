export let onChange=()=>{
    console.log('state changed')
}

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

export type messagesPageType={
    dialogsData: Array<DialogsDataType>
    messagesData: Array<MessagesDataType>
}

export type profilePageType={
    messageForNewPost: string,
    postData: Array<postDataType>
}
export type stateType = {
    messagesPage:messagesPageType
    profilePage: profilePageType
}

export let state : stateType= {
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
        ]
    },
    profilePage:{
        messageForNewPost: '',
        postData: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 11,},
            {id: 3, message: 'I am so fine today', likesCount: 11,}
        ]
    }

}

export let addPost=(postMessage: string)=>{
    let newPost={
        id: 4,
        message: postMessage,
        likesCount: 0
    }
    state.profilePage.postData.push(newPost);
    state.profilePage.messageForNewPost=''
    onChange()
}

export const changeNewText=(newText: string)=>{
    state.profilePage.messageForNewPost=newText;
    onChange()

}
export const subscribe=(observer: ()=>void )=>{
    onChange=observer
}