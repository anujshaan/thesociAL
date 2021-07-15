import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline } from '@material-ui/icons'
import React from 'react'
import "./leftbar.css"
import { Users } from '../../dummyData'
import FriendList from '../friendlist/FriendList'

export default function Leftbar() {
    
    return (
        <div className="leftbar">
           <div className="leftbarWrapper">
               <ul className="leftbarList">
                   <li className="leftbarListItem">
                       <RssFeed className="leftbarIcon"/>
                       <spna className="leftbarListItemText">Feed</spna>
                   </li>
               </ul>
               <ul className="leftbarList">
                   <li className="leftbarListItem">
                       <Chat className="leftbarIcon"/>
                       <spna className="leftbarListItemText">Chats</spna>
                   </li>
               </ul>
               <ul className="leftbarList">
                   <li className="leftbarListItem">
                       <PlayCircleFilledOutlined className="leftbarIcon"/>
                       <spna className="leftbarListItemText">Videos</spna>
                   </li>
               </ul>
               <ul className="leftbarList">
                   <li className="leftbarListItem">
                       <Group className="leftbarIcon"/>
                       <spna className="leftbarListItemText">Groups</spna>
                   </li>
               </ul>
               <ul className="leftbarList">
                   <li className="leftbarListItem">
                       <Bookmark className="leftbarIcon"/>
                       <spna className="leftbarListItemText">Bookmarks</spna>
                   </li>
               </ul>
               <ul className="leftbarList">
                   <li className="leftbarListItem">
                       <HelpOutline className="leftbarIcon"/>
                       <spna className="leftbarListItemText">Questions</spna>
                   </li>
               </ul>
               <ul className="leftbarList">
                   <li className="leftbarListItem">
                       <WorkOutline className="leftbarIcon"/>
                       <spna className="leftbarListItemText">Jobs</spna>
                   </li>
               </ul>
               <ul className="leftbarList">
                   <li className="leftbarListItem">
                       <Event className="leftbarIcon"/>
                       <spna className="leftbarListItemText">Events</spna>
                   </li>
               </ul>
               <ul className="leftbarList">
                   <li className="leftbarListItem">
                       <School className="leftbarIcon"/>
                       <spna className="leftbarListItemText">Courses</spna>
                   </li>
               </ul>
               <button className="leftbarButton">Show More</button>
            <hr className="leftbarHr"/>
            <ul className="leftbarFriendList">
                {Users.map((u)=>(
                    <FriendList key={u.id} user={u} />
                ))}
            </ul>
           </div>
        </div>
    )
}
