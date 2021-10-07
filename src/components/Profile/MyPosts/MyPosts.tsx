import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {PostsPropsType} from "./MyPostsContainer";

const MyPosts = (props:PostsPropsType ) => {

    let postElements=props.profilePage.postData.map(p=><Post message={p.message} likesCount={p.likesCount}/>)
    //вернет массив jsx элементов [<Post.../>, <Post.../>]

    const addPost=()=>{
           props.addPost(props.profilePage.messageForNewPost)

    }
    // <button onClick={addPost} : кнопке  отдаем ссылку на функцию которая при клике запустится
    //onClick={()=>{addPost()}} то же самое

    const newTextChangeHandler=(e: ChangeEvent<HTMLTextAreaElement>)=>{
      props.updateNewPostText(e.currentTarget.value)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea value={props.profilePage.messageForNewPost}
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