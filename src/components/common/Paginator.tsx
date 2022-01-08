import styles from './Paginator.module.css';
import React from "react";

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export let Paginator = (props: PaginatorPropsType) => {
    //let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= 40; i++) {
        pages.push(i);
    }
    return <div>
        {pages.map(p => {
            return <span className={props.currentPage === p ? styles.selectedPage: ''}
                         onClick={() => {
                             props.onPageChanged(p);
                         }}>{p}</span>
        })}
    </div>
}