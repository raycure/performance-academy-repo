
import React from "react";
import { useEffect, useRef, useState } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from './api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

function Login() {
    // const userRef = useRef();
    // const errRef = useRef();

    // const [user, setUser] = useState('');
    // const [validName, setValidName] = useState(false);
    // const [userFocus, setUserFocus] = useState(false);

    // const [pwd, setPwd] = useState('');
    // const [validPwd, setValidPwd] = useState(false);
    // const [pwdFocus, setPwdFocus] = useState(false);

    // const [matchPwd, setMatchPwd] = useState('');
    // const [validMatch, setValidMatch] = useState(false);
    // const [matchFocus, setMatchFocus] = useState(false);

    // const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    // useEffect(()=>
    //     {
    //         userRef.current.focus()
    //     },[])

    // useEffect(()=>
    // {
    //     const result = USER_REGEX.test(user)
    //     console.log(result);
    //     console.log(user);
    //     setValidName(result)
    // },[useRef])

    // return (
    //     <div>

    //     </div>
    // )

        const inputRef = useRef(null);
      
        useEffect(() => {
          inputRef.current.focus(); // Focus the input field when the component mounts
        }, []);
      
        return <input ref={inputRef} />;

}

export default Login

