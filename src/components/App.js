import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import Login from "./Login";

function App() {
    const [search, setSearch] = useState(""); //Header의 검색 기능
    const [bookInfo, setBookInfo] = useState([]); //DB에서 불러온 book 정보 list 형태로 저장
    const [filterBook, setFilterBook] = useState([]);
    const [count, setCount] = useState({});

    useEffect(() => {
        setFilterBook(
            search === ""
                ? bookInfo
                : bookInfo.filter(book =>
                    book.book_name.includes(search)
                )
        );
    }, [search, bookInfo]); //얘네가 바뀔 때마다 랜더링

    useEffect(() => {
        if (bookInfo.length > 0) {
            setCount(
                bookInfo.reduce((acc, book) => {
                    acc[book.book_id] = 1; //책의 book_id를 키로 하고 기본 수량을 1로 설정
                    return acc; //return 안하면 누적값이 undefined로 설정됨. { } 안에 하나씩 들어갈거임
                }, {})
            );
        }
    }, [bookInfo]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home search={search} setSearch={setSearch} count={count} setCount={setCount} setBookInfo={setBookInfo} bookInfo={bookInfo} filterBook={filterBook} />} />
                <Route path="/Cart" element={<Cart count={count} setCount={setCount} />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </Router>
    )
};

export default App;