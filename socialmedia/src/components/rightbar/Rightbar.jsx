import React, { useContext, useEffect, useState } from 'react'
import "./rightbar.css"
import { Users } from '../../dummyData';
import Online from '../online/Online';
import axios from 'axios';
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@material-ui/icons';

export default function Rightbar({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([])
    const {user:currentUser, dispatch} = useContext(AuthContext);
    const [followed, setFollowed] = useState(
        currentUser.following?.includes(user?.id)
    );

    useEffect(()=>{
        const getFriends = async()=>{
        try{
            const friendList = await axios.get("/users/friends/"+user._id)
            setFriends(friendList.data);
        }catch(e){
            console.log(e);
        }
        };
        getFriends();
    },[user]);

    const handleClick = async() =>{
        try{
            if(followed){
                await axios.put(`/users/${user._id}/unfollow`,{
                    userId:currentUser._id,
                });
                dispatch({type:"UNFOLLOW", payload:user._id});
            }else{
                await axios.put(`/users/${user._id}/follow`,{
                    userId:currentUser._id,
                });
                dispatch({type:"FOLLOW", payload:user._id});
            }
            setFollowed(!followed);
        }catch(e){
            console.log(e);
        }
    }
    const HomeRightbar = () =>{
        return(
        <>
            <div className="birthdayContainer">
                    <img className="birthdayImg" src="/assets/gift.png" alt="" />
                    <span className="birthdayText"><b>Ashish kujur </b> have birthday today</span>
                </div>
                <img src="/assets/ad.png" alt="" className="rightbarAd" />
                <h4 className="rightbatTitle">Online Friends:</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u=>(
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
        </>
        )
    }

    const ProfileRightbar = ()=>{
        return (
            <>
                {user.username !== currentUser.username && (
                    <button  className="rightbarFollowButton" onClick={handleClick}>
                       {followed ? "Unfollow" : "Follow"}
                       {followed ? <Remove /> : <Add />}
                        </button>
                )}
                {user.username === currentUser.username &&(
                    <button className="editProfile" >
                        Edit Profile
                    </button>
                )

                }
                <h4 className="rightbarTitle">User Information:</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">
                            Current City:
                        </span>
                        <span className="rightbarInfoValue">
                            {user.current}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">
                            Home Town:
                        </span>
                        <span className="rightbarInfoValue">
                            {user.home}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">
                            Date of Birth:
                        </span>
                        <span className="rightbarInfoValue">
                            01 Oct 1997
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">
                            Relationship:
                        </span>
                        <span className="rightbarInfoValue">
                            {user.relationship === 1 ? "Single" 
                            :user.relationship === 2 ? "Married" 
                            :user.relationship === 3 ? "Complicated"
                            :"-"}
                        </span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Followers:</h4>
                <div className="rightbarFollowings">
                   {friends.map((friend) =>(
                    <Link 
                        style={{textDecoration:"none"}} 
                        to={"/profile/"+friend.username}
                    >
                    <div className="rightbarFollowing">
                        <img src={friend.profilePic 
                            ? PF+friend.profilePic 
                            : PF+"person/noAvatar.png"} 
                            className="rightbarFollowingImg" 
                            alt="" />
                        <span className="rightbarFollowingName">
                            {friend.firstname+" "+friend.lastname}
                        </span>
                    </div>
                    </Link>
                   ))}
                </div>
            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar /> }
            </div>
        </div>
    )
}
