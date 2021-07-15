import { Cancel, EmojiEmotions, Label, PermMedia, Room } from '@material-ui/icons'
import React, { useContext, useRef, useState } from 'react'
import "./share.css"
import {AuthContext} from "../../context/AuthContext"
import axios from 'axios';

export default function Share() {

    const{user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const[file, setFile] = useState(null);

    const submitHandler = async(e) =>{
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc:desc.current.value,
        };
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name",fileName);
            data.append("file",file);
            newPost.img = fileName;
            console.log(newPost);
            try{
                await axios.post("/upload", data);
            }catch(e){
                console.log(e);
            }
        }
        try{
            await axios.post("/posts",newPost);
            window.location.reload();
        }catch(e){
            console.log(e);
        }
    }
    const desc = useRef();
        return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfilePic"src=
                    {user.profilePic 
                    ? PF+user.profilePic 
                    : PF+"person/noAvatar.png"} 
                    alt="" />
                    <input placeholder="Write Something...." className="shareInput" ref={desc}/>
                </div>
                <hr className="shareHr"/>
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg"
                        src={URL.createObjectURL(file)}
                        alt="" />
                        <Cancel className="shareCancelImg" onClick={()=>
                            setFile(null)
                        } />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo or Video</span>
                            <input 
                                style={{display:"none"}}
                                type="file" id="file" 
                                accept=".png,.jpeg,.jpg" 
                                onChange={(e)=>setFile(e.target.files[0])} 
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag People</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Share Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Add Emoji</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
