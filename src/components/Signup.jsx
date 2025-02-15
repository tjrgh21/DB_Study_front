import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

//axios 기본 설정
axios.defaults.withCredentials = true;

function Signup() {
    const navigate = useNavigate();
    
    const [userSignup, setUserSignup] = useState({
        id: "",
        pw: "",
        name: ""
    });

    const goToHome = () => {
        navigate("/");
    };

    const onChangeSignup = (e) => {
        const { name, value } = e.target;
        setUserSignup({
            ...userSignup,
            [name]: value,
        });
    };

    const onClickSignup = () => {
        axios.post("http://localhost:4000/signup", { user: userSignup }).then((res) => {
            console.log(res.data.msg);
        });
        axios.post("http://localhost:4000/cart", { user: userSignup }).then((res) => {
            console.log(res.data.msg2);
        });
        alert("회원가입 완료, 장바구니가 생성되었습니다.");
        navigate("/login");
    };

    return (
        <div className="Signup">
            <button className="homeBtn" onClick={goToHome}>홈</button>
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
    );
};

export default Signup;
