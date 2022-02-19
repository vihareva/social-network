import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { profilePageType} from "../../../redux/profile-reducer";
import cs from "../../../assets/Common.module.css";
import {Redirect} from "react-router-dom";

type PostsPropsType = {
    profilePage: profilePageType
    isAuth: boolean
    addPost: (postMessage: string, date: string) => void
    updateNewPostText: (body: string) => void
}
const MyPosts = (props: PostsPropsType) => {

    if (!props.isAuth) {
        return <Redirect to={'/login'}/>
    }

    let postElements = props.profilePage.postData.map(p => <Post key={p.id} profile={props.profilePage.profile} date= {p.date} message={p.message} likesCount={p.likesCount}/>)

    const addPost = () => {
        let date=new Date()
        let stringDay=date.getDay()+ '.'+date.getMonth()+ '.'+date.getFullYear()
        let stringTime=date.getHours()+ ':'+ date.getMinutes()
        let stringDate=stringDay+ ' at '+stringTime
        props.addPost(props.profilePage.messageForNewPost, stringDate)
    }

    const newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)
    }

    return (
        <div className={s.postsBlock}>
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