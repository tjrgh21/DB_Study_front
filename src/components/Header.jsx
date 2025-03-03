import React, { useState, useEffect } from "react";
import '../styles/Header.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header({ search, setSearch, type }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:4000/");
                setUser(res.data.user);
            } catch (error) {
                console.error("유저 정보를 불러올 수 없습니다:", error);
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    const goCart = () => navigate("/Cart");
    const goLogin = () => navigate("/Login");
    const goHome = () => navigate("/");
    const goMypage = () => navigate("/Mypage");
    const goOrder = () => navigate("/OrderList");

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
            {type === "search" && (
                <input type="text" placeholder="도서 검색" value={search} onChange={searchBook} />
            )}
            
            <div className="Btns">
                {!user ? (
                    <button className="LoginBtn" onClick={goLogin}>로그인</button>
                ) : (
                    <>
                    <button className="CartBtn" onClick={goCart}>장바구니</button>
                    <button className="OrderBtn" onClick={goOrder}>주문내역</button>
                    <button className="MypageBtn" onClick={goMypage}>MyPage</button>
                    <button className="LogoutBtn" onClick={onClickLogout}>로그아웃</button>
                    </>
                )}
            </div>
        </div>
    )
};

export default Header;