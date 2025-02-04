import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";

//axios 기본 설정
axios.defaults.withCredentials = true;

function Login() {
    const [userSignup, setUserSignup] = useState({
        id: "",
        pw: "",
        name: ""
    });

    const [userLogin, setUserLogin] = useState({
        id: "",
        pw: ""
    })

    const onChangeSignup = (e) => {
        const { name, value } = e.target;
        setUserSignup({
            ...userSignup,
            [name]: value,
        });
    }

    const onChangeLogin = (e) => {
        const { name, value } = e.target;
        setUserLogin({
            ...userLogin,
            [name]: value,
        });
    }

    const onClickSignup = () => {
        // console.log(userSignup)
        axios.post("http://localhost:4000/signup", { user: userSignup }).then((res) => {
            console.log(res.data.msg)
        })
    }

    const onClickLogin = () => {
        axios.post("http://localhost:4000/login", { user: userLogin }).then((res) => {
            console.log(res.data.msg)
        })
    }

    const onClickLogout = () => {
        axios.post("http://localhost:4000/logout").then((res) => {
            console.log(res.data.msg)
        })
    }

return (
    <div className="Login">
        <h3>Sign in</h3>
        <div className="inputContainer">
            <input
                type="text"
                placeholder="ID"
                onChange={onChangeSignup}
                name="id"
                value={userSignup.id}
            />
            <br />
            <input
                type="password"
                placeholder="PW"
                onChange={onChangeSignup}
                name="pw"
                value={userSignup.pw}
            />
            <br />
            <input
                type="text"
                placeholder="name"
                onChange={onChangeSignup}
                name="name"
                value={userSignup.name}
            />
        </div>
        <button onClick={onClickSignup}>회원가입</button>
        <div>
            <input
                type="text"
                placeholder="ID"
                onChange={onChangeLogin}
                name="id"
                value={userLogin.id}
            />
            <br />
            <input
                type="password"
                placeholder="PW"
                onChange={onChangeLogin}
                name="pw"
                value={userLogin.pw}
            />
        </div>
        <button onClick={onClickLogin}>로그인</button>
        <button onClick={onClickLogout}>로그아웃</button>
    </div>
)
};

export default Login;