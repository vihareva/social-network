import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css';
import {HeaderContainerType} from "./HeaderContainer";
import cs from "../../assets/Common.module.css";


const Header = (props: HeaderContainerType) => {
    return <header className={s.header}>
        <div>
            <div className={s.cont}>
            {props.isAuth ?
                   <>
                       <div  className={s.login}>{props.login}</div>
                       <div>
                           <button className={`${s.button} ${cs.button}`} onClick={props.logout}> log out</button>
                       </div>
                   </>
                : <NavLink className={`${s.button} ${cs.button}`}  to={'/login'}>Login</NavLink>}
            </div>
        </div>
    </header>
}

export default Header;