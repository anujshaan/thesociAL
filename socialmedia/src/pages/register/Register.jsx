import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { loginCall } from '../../apiCalls';
import "./register.css"
import {useHistory} from 'react-router-dom';

export default function Login() {

    const firstname = useRef();
    const lastname = useRef();
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const history = useHistory();
    // const{ user, isFetching, error, dispatch} = useContext(AuthContext)


    const handleClick = async (e)=>{
        e.preventDefault();
        if(password.current.value !== confirmPassword.current.value){
            confirmPassword.current.setCustomValidity("password doesn't match");
        }else{
            const user = {
                 firstname:firstname.current.value,
                 lastname:lastname.current.value,
                 username:username.current.value,
                 email:email.current.value, 
                 password:password.current.value
                };
                try{
                    await axios.post("/auth/register",user)
                    history.push("/login")
                }catch(e){
                    console.log(e);
                }
        }
    }
    // console.log(user);
    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">theSociAL</h3>
                    <span className="registerDesc">
                        Connect with friends with theSociAL
                    </span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleClick}>
                        <div className="registerName">
                            <input placeholder="firstname" required ref={firstname} className="firstName" />
                            <input placeholder="lastname" required ref={lastname} className="lastName" />
                        </div>
                        <input placeholder="username" ref={username} required type="text" className="registerInput" />
                        <input placeholder="email" type="email" ref={email} required className="registerInput" />
                        <input placeholder="password" type="password" ref={password} minLength="6" required className="registerInput" />
                        <input placeholder="confirm password" type="password" required ref={confirmPassword} className="registerInput" />
                        <button className="registerButton" type="submit">Sign In</button>
                        <button className="registerLoginButton">Already have Account</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}
