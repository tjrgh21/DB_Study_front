import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//axios 기본 설정
axios.defaults.withCredentials = true;

function Login() {
    const navigate = useNavigate();

    //Home 페이지로 이동
    const goToHome = () => {
        navigate("/");
    };

    //Signup 페이지로 이동
    const goToSignup = () => {
        navigate("/signup");
    };

    const [userLogin, setUserLogin] = useState({
        id: "",
        pw: ""
    });

    const onChangeLogin = (e) => {
        const { name, value } = e.target;
        setUserLogin({
            ...userLogin,
            [name]: value,
        });
    };

    const onClickLogin = () => {
        axios.post("http://localhost:4000/login", { user: userLogin }).then((res) => {
            console.log(res.data.msg);
            alert(res.data.msg);
            if (res.data.msg === "로그인 되었습니다.") {
                navigate("/");
            }
        });
    };

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
                <button className="SignupBtn" onClick={goToSignup}>회원가입</button>
            </div>
        </div>
    );
}

export default Login;
