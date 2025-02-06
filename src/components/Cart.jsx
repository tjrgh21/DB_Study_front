import React from "react";
import Header from "./Header";
import "../styles/Cart.css";

function Cart() {
    return (
        <div className="Cart">
            <Header />
            <h2>장바구니 목록</h2>
            <p>장바구니가 비어 있습니다.</p>
        </div>
    )
};

export default Cart;