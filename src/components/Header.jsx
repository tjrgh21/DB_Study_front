import React, { useState, useEffect } from "react";
import '../styles/Header.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header({ search, setSearch }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:4000/").then((res) => {
                setUser(res.data.user);
            })
    }, []);

    //Cart 페이지로
    const goCart = () => {
        navigate("/Cart");
    }

    //Login 페이지로
    const goLogin = () => {
        navigate("/Login");
    }

    //Home 으로
    const goHome = () => {
        navigate("/");
    }

    const goMypage = () => {
        navigate("/Mypage");
    }

    const searchBook = (e) => {
        setSearch(e.target.value);
    }

    const onClickLogout = () => {
        axios.post("http://localhost:4000/logout").then((res) => {
            console.log(res.data.msg)
            setUser(null);
            navigate("/");
            alert("로그아웃 되었습니다.")
        })
    }

    return (
        <div className="Header">
            <div className="logo" onClick={goHome}>동서문고</div>
            <input type="text" placeholder="도서 검색" value={search} onChange={searchBook} />
            <div className="Btns">
                {user ? (
                    <>
                    <button className="CartBtn" onClick={goCart}>장바구니</button>
                    <button className="LogoutBtn" onClick={onClickLogout}>로그아웃</button>
                    <button className="MypageBtn" onClick={goMypage}>MyPage</button>
                    </>
                ) : (
                    <button className="LoginBtn" onClick={goLogin}>로그인</button>
                )}
            </div>
        </div>
    )
};

export default Header;