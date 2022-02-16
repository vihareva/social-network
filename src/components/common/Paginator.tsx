import styles from './Paginator.module.css';
import React, {useEffect, useState} from "react";
import cs from "../../assets/Common.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import {v1} from "uuid";



type PaginatorPropsType = {
    portionSize: number
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export let Paginator = React.memo((props: PaginatorPropsType) => {
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

    return <div className={styles.paginatorCont}>
        <div className={` ${cs.container} ${styles.pagesContainer} ` }>
            {portionNumber > 1 && <span className={styles.button} onClick={() => setPortionNumber(portionNumber - 1)}>
            <FontAwesomeIcon icon={faChevronLeft}/>
        </span>}
            {pages.map(p => {
                if (p >= firstPortionElement && p <= lastPortionElement)
                    return <span
                        className={props.currentPage === p ? `${styles.page} ${styles.selectedPage}` : styles.page}
                                 onClick={() => {
                                     props.onPageChanged(p);
                                 }}>{p}</span>
            })}
            {portionNumber < portionCount
            && <span className={styles.button} onClick={() => setPortionNumber(portionNumber + 1)}>
          <FontAwesomeIcon icon={faChevronRight}/>
        </span>}
        </div>
    </div>
})