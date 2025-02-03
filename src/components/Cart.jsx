import React from "react";
import Header from "./Header";

function Cart({ cartList, setCartList }) {
    const clearCart = () => {
        setCartList([]);
    }
    return (
        <div className="Cart">
            <Header />
            <h2>장바구니 목록</h2>
            {cartList.length === 0 ? (
                <p>장바구니가 비어 있습니다.</p>
            ) : (
                <div>
                    {cartList.map((book, index) => (
                        <div key={index}>{book.title}</div>
                    ))}
                </div>
            )}
            <button>구매</button>
            <button onClick={() => {clearCart()}}>비우기</button>
        </div>
    )
};

export default Cart;