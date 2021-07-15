import React from 'react'
import "./friendlist.css"

export default function FriendList({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="leftbarFriend">
            <img src={PF+user.ProfilePic} alt="" className="leftbarFriendImg" />
            <span className="leftbarFriendName">{user.username}</span>
        </li>
    )
}
