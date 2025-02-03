import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import Login from "./Login";
import InfoBook from "./InfoBook";

function App() {
    const [cartList, setCartList] = useState([]); //장바구니에 담은 도서 목록록
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Cart" element={<Cart cartList={cartList}  setCartList={setCartList}/>} />
                <Route path="/Login" element={<Login />} />
                <Route path="/book/:id" element={<InfoBook cartList={cartList} setCartList={setCartList} />} />
            </Routes>
        </Router>
    )
};

export default App;