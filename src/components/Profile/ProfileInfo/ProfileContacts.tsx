import s from "./ProfileInfo.module.css";
import cs from "../../../assets/Common.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ContactsType, ProfileType} from "../../../redux/profile-reducer";
import React from "react";
import {faFacebookF, faGithub, faInstagram, faTwitter, faVk, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faLaptopHouse, faPaperclip} from "@fortawesome/free-solid-svg-icons";

const contactImages = {
    github: faGithub,
    vk: faVk,
    facebook: faFacebookF,
    instagram: faInstagram,
    twitter: faTwitter,
    website: faLaptopHouse,
    youtube: faYoutube,
    mainLink: faPaperclip
}

type ProfileContactsPropsType={
    profile: ProfileType
}

export const ProfileContacts = (props: ProfileContactsPropsType) => {

    return  <div>
        <div className={s.contactsContainer}>
            {Object.keys(props.profile.contacts).map(contact => {

                return <div key={contact}
                                className={`${cs.container} ${s.contactContainer}`}>
                    <div className={s.iconContainer}>
                        <FontAwesomeIcon size={"2x"}
                                         icon={contactImages[contact as keyof ContactsType]}/>
                    </div>
                    <div className={s.contactDescContainer}>
                        <div className={s.contact}>{contact}</div>
                        <div>
                            <a className={s.contactValue}
                               href={props.profile.contacts[contact as keyof ContactsType]}>
                                {props.profile.contacts[contact as keyof ContactsType] ? 'click here to go' : 'no link'}
                            </a>
                        </div>
                    </div>
                </div>

            })}
        </div>
    </div>

}