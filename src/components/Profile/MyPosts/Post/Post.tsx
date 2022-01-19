import React from 'react';
import s from './Post.module.css';
import userPhoto from '../../../../assets/userPhoto.jpg'

type PostType={
    message: string
    likesCount: number
}
const Post = (props: PostType) => {

    return (
        <div className={s.item}>

            { props.message }
            <div>
                <span>like</span> { props.likesCount }
            </div>
        </div>
    )
}

export default Post;