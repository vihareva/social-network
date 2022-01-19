import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";
import React from "react";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import s from './NavbarItem.module.css';


type NavbarItemPropsType = {
    icon: IconDefinition,
    size: SizeProp
    to: string
    linkName: string
}
const NavbarItem = (props: NavbarItemPropsType) => {

    return (<>
            <div className={`${s.item} ${s.active}`}>
                <div className={s.icon}>
                    <FontAwesomeIcon icon={props.icon} size={props.size}/>
                </div>
                {/*<NavLink to="/profile" className={s.item} activeClassName={s.activeLink}>Profile</NavLink>*/
                }
                <div className={s.navlinkCont}>
                       <NavLink to={props.to} className={s.item} activeClassName={s.activeLink}>{props.linkName}</NavLink>
                   </div>
            </div>
        </>

    )
}

export default NavbarItem;