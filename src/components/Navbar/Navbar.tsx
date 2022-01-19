import React from 'react';
import s from './Navbar.module.css';
import cs from '../../assets/Common.module.css';
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {faSms} from "@fortawesome/free-solid-svg-icons";
import {faMusic} from "@fortawesome/free-solid-svg-icons";
import {faNewspaper} from "@fortawesome/free-solid-svg-icons";
import NavbarItem from "./NavbarItem";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import styles from "../Users/Users.module.css";
import userPhoto from "../../assets/userPhoto.jpg";
import {photosType} from "../../redux/profile-reducer";
import {Redirect} from "react-router-dom";


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