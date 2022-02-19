import React from 'react';
import s from './Navbar.module.css';
import cs from '../../assets/Common.module.css';
import {faHome, faMusic, faNewspaper, faSms, faUser} from "@fortawesome/free-solid-svg-icons";
import NavbarItem from "./NavbarItem";

const Navbar = () => {

    return (
        <div className={s.nav}>
            <div className={cs.container}>
                <NavbarItem icon={faHome} size={"lg"} to="/profile" linkName={'Profile'}/>
                <NavbarItem icon={faSms} size={"lg"} to="/dialogs" linkName={'Messages'}/>
                <NavbarItem icon={faUser} size={"lg"} to="/users" linkName={'Find Users'}/>
                <NavbarItem icon={faNewspaper} size={"lg"} to="/posts" linkName={'Posts'}/>
                <NavbarItem icon={faMusic} size={"lg"} to="/music" linkName={'Music'}/>
            </div>
        </div>
    )

}

export default Navbar;