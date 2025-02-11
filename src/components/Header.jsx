import React from "react";
import '../styles/Header.css';
import { useNavigate } from "react-router-dom";

function Header({ search, setSearch }) {
    const navigate = useNavigate();

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

    const searchBook = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className="Header">
            <div className="logo" onClick={goHome}>동서문고</div>
            <input type="text" placeholder="도서 검색" value={search} onChange={searchBook} />
            <div className="myPage">
                <button className="CartBtn" onClick={goCart}>장바구니</button>
                <button className="LoginBtn" onClick={goLogin}>
                    로그인
                </button>
            </div>
        </div>
    )
};

export default Header;