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
let id1 = v1();
let id2 = v1();
let id3 = v1();
let id4 = v1();
let id5 = v1();

let initialState = {
    dialogsData: [
        {id: id1, name: 'Michael'},
        {id: id2, name: 'Alex'},
        {id: id3, name: 'Elizaveta'},
        {id: id4, name: 'Roman'},
        {id: id5, name: 'Vladimir'},
    ],
    messagesData: {
        [id1]: [
            {id: v1(), message: 'my team had a debate on what the best looping variable name is'},
            {id: v1(), message: 'i won'},
            {id: v1(), message: 'junior dev makes a mistake: "im so fired, my career is over"'},
            {id: v1(), message: 'senior dev makes a mistake: "lol hey guys look at this dumb shit i did"'},
        ],
        [id2]: [
            {id: v1(), message: '-my mate needs a website designing, told him 500$. i have sent him your number'},
            {id: v1(), message: '-what? how big is the website?'},
            {id: v1(), message: '-normal screen size'},
        ],
        [id3]: [
            {
                id: v1(), message: 'teacher: if i have 0.1 apples in pne hand and 0.2 apples in the other hand,' +
                    ' how many apples do i have'
            },
            {id: v1(), message: 'Javascript:0.30000000000000004 '},
        ],
        [id4]: [
            {id: v1(), message: 'coworker: so how did you solve the bug?'},
            {id: v1(), message: 'me:ostrich algorithm'},
            {
                id: v1(), message: '*In computer science, the ostrich algorithm is a strategy of ignoring potential' +
                    ' problems on the basis that they may be exceedingly rare. It is named after the ostrich ' +
                    'effect which is defined as "to stick one\'s head in the sand and pretend there is no problem". ' +
                    'It is used when it is more cost-effective to allow the problem to occur than to attempt its prevention.*'
            },
        ],
        [id5]: [
            {
                id: v1(), message: 'people are out there making new year plans, getting married, going on vacation ' +
                    'and here I am wondering what should I name class in my code'
            },

        ],
    }
}


export type DialogsActionType = SendMessageActionType

export const dialogsReducer = (state: messagesPageType = initialState, action: DialogsActionType): messagesPageType => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            return {
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
type SendMessageActionType = ReturnType<typeof sendMessageActionCreator>