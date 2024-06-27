import React, {useRef, useState} from 'react';
import http from "../plugins/http";

const RegisterPage = () => {

    const [regError, setRegError] = useState("")

    const newUsername = useRef()
    const newPassOne = useRef()
    const newPassTwo = useRef()

    function register() {
        let newAccount = {
            name: "",
            passwordOne: "",
            passwordTwo: ""
        }

        newAccount.name = newUsername.current.value
        newAccount.passwordOne = newPassOne.current.value
        newAccount.passwordTwo = newPassTwo.current.value

        http.post("/createaccount", newAccount)
            .then(res => {
                setRegError(res.message)
            })
    }

    return (
        <div className={"login"}>
            <h2>Register</h2>
            <input ref={newUsername} type="text" placeholder={"Username"}/>
            <input ref={newPassOne} type="text" placeholder={"Password One"}/>
            <input ref={newPassTwo} type="text" placeholder={"Password Two"}/>
            <div>{regError}</div>
            <div className={"navButton"} onClick={register}>Register</div>
        </div>
    );
};

export default RegisterPage;