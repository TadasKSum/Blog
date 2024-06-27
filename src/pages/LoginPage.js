import React, {useRef, useState} from 'react';
import mainStore from "../store/mainStore";
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const {setLogged} = mainStore()

    const [error, setError] = useState("")

    const name = useRef()
    const password = useRef()

    const nav = useNavigate()

    function login() {
        let newLogin = {
            name: "",
            password: ""
        }

        newLogin.name = name.current.value
        newLogin.password = password.current.value

        http.post("/login", newLogin)
            .then(res => {
                if (res.success) {
                    setError("")
                    setLogged(newLogin.name)
                    localStorage.setItem("username", newLogin.name)
                    localStorage.setItem("secret", res.secretKey)
                    nav("/")
                } else {
                    setError(res.message)
                }
            })
    }

    return (
        <div className={"login"}>
            <h2>Login</h2>
            <input ref={name} type="text" placeholder={"Username"}/>
            <input ref={password} type="text" placeholder={"Password"}/>
            <div>{error}</div>
            <div className={"navButton"} onClick={login}>Login</div>
        </div>
    );
};

export default LoginPage;