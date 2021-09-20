import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {postDataType} from "../../../redux/state";



type MyPostsPropsType={
    postData:Array<postDataType>
    addPost:(postMessage: string)=>void
    message: string
    changeNewText: (newText: string)=>void
}

const MyPosts = (props:MyPostsPropsType ) => {

    let postElements=props.postData.map(p=><Post message={p.message} likesCount={p.likesCount}/>)
    //вернет массив jsx элементов [<Post.../>, <Post.../>]

    const addPost=()=>{
            props.addPost(props.message)

    }
    // <button onClick={addPost} : кнопке  отдаем ссылку на функцию которая при клике запустится
    //onClick={()=>{addPost()}} то же самое

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea value={props.message}
                              onChange={(e)=>{
                                  console.log(e.currentTarget.value);
                                  props.changeNewText(e.currentTarget.value)
                    }}/>
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