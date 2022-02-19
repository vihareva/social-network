import {addPost, deletePost, profileReducer, ProfileType} from "./profile-reducer";

let state = {
    messageForNewPost: '',
    postData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11,},
        {id: 3, message: 'I am so fine today', likesCount: 11,}
    ],
    profile: {} as ProfileType,
    status: ''
}

test('message of added post should be correct',()=>{
    let action=addPost('hello')

    let newState=profileReducer(state, action);

    expect(newState.postData[0].message).toBe('hello')
})


test('length of postData should be correct',()=>{
    let action=addPost('hello')

    let newState=profileReducer(state, action);

    expect(newState.postData.length).toBe(4)

})

test('deleting of post should be correct',()=>{
    let action=deletePost(1)

    let newState=profileReducer(state, action);

    expect(newState.postData.length).toBe(2)
    expect(newState.postData[0].id).toBe(2)

})

