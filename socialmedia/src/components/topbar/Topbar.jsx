import { Chat, Notifications, Person, Search } from '@material-ui/icons'
import  { useContext } from 'react'
import "./topbar.css"
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"

export default function Topbar() {

    const {user, dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const logoutFunction= ()=>{
        localStorage.clear();
        dispatch({type:"CLEAR"});
    }
    return (
        <div className="topbar">
            <div className="topbar-left">
                <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">theSociAL</span>
                </Link>
            </div>
            <div className="topbar-center">
                <div className="search-bar">
                    <Search className="search-icon"/>
                    <input placeholder="Type anything" className="search-input" />
                </div>
            </div>
            <div className="topbar-right">
                <div className="topbar-icons">
                    <div className="topbar-icon-item">
                        <Person />
                        <span className="topbar-icon-badge">1</span>
                    </div>
                    <div className="topbar-icon-item">
                        <Chat />
                        <span className="topbar-icon-badge">3</span>
                    </div>
                    <div className="topbar-icon-item">
                        <Notifications />
                        <span className="topbar-icon-badge">5</span>
                    </div>
                </div>
                <Link to = {`/profile/${user.username}`} >
                    <img src=
                    {
                        user.profilePic
                        ? PF+user.profilePic 
                        : PF+"person/noAvatar.png"
                    } 
                        alt="" 
                        className="topbar-img" />
                </Link> 
                <Link to = {`/signup`}>
                    <button className = "logoutButton" onClick={logoutFunction}>Logout</button>
                </Link>           
            </div>
        </div>
    )
}
