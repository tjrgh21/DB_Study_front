import React from "react";
import Header from "./Header";
import "../styles/Cart.css";

function Cart({ cartList, setCartList, setCount }) {
    const clearCart = () => {
        setCartList([]);
    }

    const plus = (index) => {
        const newCartList = [...cartList]
        newCartList[index].count = (newCartList[index].count || 1) +1;
        setCount(newCartList)
    };

    const minus = (index) => {
        const newCartList = [...cartList]
        newCartList[index].count = Math.max((newCartList[index].count || 1) -1, 1);
        setCount(newCartList)
    };

    return (
        <div className="Cart">
            <Header />
            <div className="ItemPrice">
                <h2>장바구니 목록</h2>
                {cartList.length === 0 ? (
                    <p>장바구니가 비어 있습니다.</p>
                ) : (
                    <div>
                        {cartList.map((book, index) => (
                            <div key={index}>
                                {book.title} {book.price * (book.count)}원
                                <div>
                                    <button onClick={() => minus(index)}>-</button>
                                    <input
                                        className="CartInput"
                                        type="number"
                                        value={book.count}
                                        readOnly //화살표 없어짐
                                    />
                                    <button onClick={() => plus(index)}>+</button>
                                </div>
                            </div>
                        ))}
                        <span className="CartBtns">
                            <button>구매</button>
                            <button onClick={clearCart}>비우기</button>
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Cart;
