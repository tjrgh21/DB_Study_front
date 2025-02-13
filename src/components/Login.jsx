import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//axios 기본 설정
axios.defaults.withCredentials = true;

function Login() {
    const navigate = useNavigate();

    //Home 페이지로
    const goToHome = () => {
        navigate("/");
    }

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
        axios.post("http://localhost:4000/signup", { user: userSignup }).then((res) => {
            console.log(res.data.msg)
        })
        axios.post("http://localhost:4000/cart", { user: userSignup }).then((res) => {
            console.log(res.data.msg2)
        })
        alert("회원가입 완료, 장바구니가 생성되었습니다.")
    }

    const onClickLogin = () => {
        axios.post("http://localhost:4000/login", { user: userLogin }).then((res) => {
            console.log(res.data.msg);
            if (res.data.msg === "로그인 되었습니다.") {
                alert(res.data.msg);
                navigate("/");
            } else {
                alert(res.data.msg);
            }
        })
    }

    const onClickLogout = () => {
        axios.post("http://localhost:4000/logout").then((res) => {
            console.log(res.data.msg)
            alert("로그아웃 되었습니다.")
        })
    }

    return (
        <div className="Login">
            <button className="homeBtn" onClick={goToHome}>홈</button>
            <h2>로그인</h2>
            <div className="LoginContainer">
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
            <div className="LogBtns">
            <button className="LogBtn" onClick={onClickLogin}>로그인</button>
            <button className="LogBtn" onClick={onClickLogout}>로그아웃</button>
            </div>
            <h2>회원가입</h2>
            <div className="SignupContainer">
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
                    placeholder="Name"
                    onChange={onChangeSignup}
                    name="name"
                    value={userSignup.name}
                />
            </div>
            <button className="SignupBtn" onClick={onClickSignup}>회원가입</button>
        </div>
    )
};

export default Login;