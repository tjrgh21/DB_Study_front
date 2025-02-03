import React from "react";
import "../styles/Login.css";

function Login() {
    return (
        <div className="Login">
            <h3>Sign in</h3>
            <div className="inputContainer">
                <input type="text" placeholder="ID" />
                <input type="text" placeholder="PW" />
            </div>
            <button>로그인</button>
            <button>회원가입</button>
        </div>
    )
};

export default Login;