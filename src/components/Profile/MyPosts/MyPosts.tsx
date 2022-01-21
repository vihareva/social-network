import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {PostsPropsType} from "./MyPostsContainer";
import img from '../../../assets/zzzz.jpg'
import cs from "../../../assets/Common.module.css";

const MyPosts = (props: PostsPropsType) => {

    let postElements = props.profilePage.postData.map(p => <Post profile={props.profilePage.profile} date= {p.date} message={p.message} likesCount={p.likesCount}/>)
    //вернет массив jsx элементов [<Post.../>, <Post.../>]

    const addPost = () => {
        let date=new Date()
        let stringDay=date.getDay()+ '.'+date.getMonth()+ '.'+date.getFullYear()
        let stringTime=date.getHours()+ ':'+ date.getMinutes()
        let stringDate=stringDay+ ' at '+stringTime
        props.addPost(props.profilePage.messageForNewPost, stringDate)
    }
    // <button onClick={addPost} : кнопке  отдаем ссылку на функцию которая при клике запустится
    //onClick={()=>{addPost()}} то же самое

    const newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)
    }

    return (
        <div className={s.postsBlock}>
            {/*<img src={img}/>*/}

            <div>

                <div className={`${cs.container} ${s.addPostContainer}`}>
                    <div className={s.header}>My posts</div>
                    <textarea className={`${cs.input} ${s.textarea}`}
                              placeholder="What's new?"
                              value={props.profilePage.messageForNewPost}
                              onChange={newTextChangeHandler}/>
                    <div>
                        <button className={`${cs.button} ${s.addButton}`} onClick={addPost}>Add post</button>
                    </div>
                </div>

                <div className={s.posts}>
                    {postElements}
                </div>
            </div>

        </div>
    )
}

export default MyPosts;