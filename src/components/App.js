import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import Login from "./Login";

function App() {
    const [count, setCount] = useState(1); //장바구니에 담을 수량
    const [search, setSearch] = useState(""); //Header 검색

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home search={search} setSearch={setSearch} count={count} setCount={setCount} />} />
                <Route path="/Cart" element={<Cart count={count} setCount={setCount} />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </Router>
    )
};

export default App;