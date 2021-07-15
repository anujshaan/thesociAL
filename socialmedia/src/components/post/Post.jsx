import React,{ useContext, useEffect, useState } from 'react'
import "./post.css"
import { MoreVert } from '@material-ui/icons';
import axios from 'axios';
import {format} from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Post({post}) {

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id));
    },[currentUser._id, post.likes]);

     useEffect(()=>{
        const fetchUser = async () =>{
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    },[post.userId])    

    const likeHandler = () => {
        try{
            axios.put("/posts/"+post._id+"/like",{userId:currentUser._id});
        }catch(e){}
        if(isLiked === false){
            setLike(like + 1);
            setIsLiked(true);
        }else{
            setLike(like - 1);
            setIsLiked(false);
        }
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`} style={{textDecoration:'none',display:'flex',alignItems:'center'}}>
                        <img className="postProfileImg" 
                            src={currentUser.profilePic 
                            ? PF+currentUser.profilePic 
                            : PF+"person/noAvatar.png"} 
                            alt="" />
                        <span className="postUsername">{user.firstname+" "+ user.lastname}</span>
                        </Link>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">
                        {post?.desc}
                    </span>
                    <img className="postImg" src={PF+post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
                        <img className="likeIcon" src={`${PF}heart.png`}onClick={likeHandler} alt="" />
                        <span className="likeCounter">{like} people liked</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommetText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
