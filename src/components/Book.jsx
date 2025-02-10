import React from "react";
import "../styles/Book.css";
import axios from "axios";

axios.defaults.withCredentials = true;

function Book({ count, filterBook }) {
    //장바구니에 책 추가
    // const addCart = () => {
    //     axios.post("http://localhost:4000/cart", { cartItem: bookInfo }).then((res) => {
    //         console.log(res.data.msg)
    //     })
    // }

    return (
        <div className="Book">
            {filterBook.map((book) => (
                <div key={book.book_id} className="BookItem">
                    <h2>{book.book_name}</h2>
                    <p>가격: {book.price}원</p>
                    <p>재고량: {book.stock}개</p>
                    <span>
                        <button>-</button>
                        <input className="countBook" type="number" value={count} />
                        <button>+</button>
                    </span>
                    <button>장바구니</button>
                </div>
            ))}
        </div>
    )
};

export default Book;