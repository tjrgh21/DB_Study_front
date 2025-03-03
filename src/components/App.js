import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import Cart from "./Cart";
import Login from "./Login";
import Signup from "./Signup";
import MyPage from "./Mypage";
import Order from "./Order";
import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";

function App() {
    const [search, setSearch] = useState(""); //Header의 검색 기능
    const [bookInfo, setBookInfo] = useState([]); //DB에서 불러온 book 정보 list 형태로 저장
    const [filterBook, setFilterBook] = useState([]);
    const [count, setCount] = useState({});
    const [user, setUser] = useState(null);

    useEffect(() => {
        // 사용자 정보 로드
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:4000/");
                setUser(res.data.user);
                console.log(res.data.user);
            } catch (error) {
                console.error("유저 정보를 불러올 수 없습니다:", error);
                setUser(null);
            }
        };
    
        fetchUser();
    
        // 책 필터링 및 수량 설정
        if (bookInfo.length > 0) {
            setFilterBook(
                search === ""
                    ? bookInfo
                    : bookInfo.filter(book => book.book_name.includes(search))
            );
    
            const initialCount = {};
            bookInfo.map(book => (initialCount[book.book_id] = 1));
            setCount(initialCount);
        }
    }, [search, bookInfo]);

    return (
        <>
            <Router>
                {/* <Header /> */}
                <Routes>
                    <Route path="/" element={<Home search={search} setSearch={setSearch} count={count} setCount={setCount} setBookInfo={setBookInfo} bookInfo={bookInfo} filterBook={filterBook} user={user}/>} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/cart" element={<Cart count={count} setCount={setCount} />} />
                    <Route path="/MyPage" element={<MyPage/>} />
                    <Route path="/Order" element={<Order />} />
                    <Route path="/OrderList" element={<OrderList />} />
                    <Route path="/orderDetail/:order_id" element={<OrderDetail />} />
                </Routes>
            </Router>
        </>
    )
};

export default App;