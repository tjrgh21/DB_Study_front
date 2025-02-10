import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import Login from "./Login";

function App() {
    const [count, setCount] = useState(1); //장바구니에 담을 수량
    const [search, setSearch] = useState(""); //Header의 검색 기능
    const [bookInfo, setBookInfo] = useState([]); //DB에서 불러온 book 정보 list 형태로 저장

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home search={search} setSearch={setSearch} count={count} setCount={setCount} setBookInfo={setBookInfo} bookInfo={bookInfo} />} />
                <Route path="/Cart" element={<Cart count={count} setCount={setCount} />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </Router>
    )
};

export default App;