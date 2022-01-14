import styles from './Paginator.module.css';
import React, {useEffect, useState} from "react";

type PaginatorPropsType = {
    portionSize: number
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export let Paginator = (props: PaginatorPropsType) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);

    let [portionNumber, setPortionNumber] = useState(1)

    useEffect(() => {
        props.onPageChanged(firstPortionElement);
    }, [portionNumber])



    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pages.length / props.portionSize);
    let firstPortionElement = (portionNumber - 1) * props.portionSize + 1;
    let lastPortionElement = portionNumber * props.portionSize;

    return <div>
        {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>prev</button>}
        {pages.map(p => {
            if (p >= firstPortionElement && p <= lastPortionElement)
                return <span className={props.currentPage === p ? `${styles.page} ${styles.selectedPage}` : styles.page}
                             onClick={() => {
                                 props.onPageChanged(p);
                             }}>{p}</span>
        })}
        {portionNumber < portionCount && <button onClick={() => setPortionNumber(portionNumber + 1)}>next</button>}
    </div>
}