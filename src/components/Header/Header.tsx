import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css';
import {HeaderContainerType} from "./HeaderContainer";


const Header = (props: HeaderContainerType) => {
    return <header className={s.header}>
        {/*<img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />*/}
        <div>
            {props.isAuth ?
                <div>
                    {props.login}
                    <button onClick={props.logout}> log out</button>
                </div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;