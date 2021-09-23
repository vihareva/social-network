import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {actionTypes, addPostActionCreator, postDataType, updateNewPostTextActionCreator} from "../../../redux/state";



type MyPostsPropsType={
    postData:Array<postDataType>
    dispatch: (action: actionTypes)=>void
    message: string

}

const MyPosts = (props:MyPostsPropsType ) => {

    let postElements=props.postData.map(p=><Post message={p.message} likesCount={p.likesCount}/>)
    //вернет массив jsx элементов [<Post.../>, <Post.../>]

    const addPost=()=>{
            props.dispatch(addPostActionCreator(props.message))

    }
    // <button onClick={addPost} : кнопке  отдаем ссылку на функцию которая при клике запустится
    //onClick={()=>{addPost()}} то же самое

    const newTextChangeHandler=(e: ChangeEvent<HTMLTextAreaElement>)=>{
        props.dispatch(updateNewPostTextActionCreator(e.currentTarget.value))
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea value={props.message}
                              onChange={newTextChangeHandler}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
}

export default MyPosts;