import React from "react";
import "../styles/Book.css";
import axios from "axios";

axios.defaults.withCredentials = true;

function Book({ count, filterBook, setCount }) {
    const quantityPlus = (book_id, stock) => {
        setCount(prevCounts => ({
            ...prevCounts,
            [book_id]: prevCounts[book_id] < stock
                ? prevCounts[book_id] + 1
                : stock
        }));
    };

    const quantityMinus = (book_id) => {
        setCount(prevCounts => ({
            ...prevCounts,
            [book_id]: prevCounts[book_id] > 1
                ? prevCounts[book_id] - 1
                : 1
        }));
    };

    //장바구니에 책 추가
    const addCart = (book) => {
        axios.post("http://localhost:4000/cartBook", {
            book_id: book.book_id,
            quantity: count[book.book_id]
        }).then((res) => {
            alert("장바구니에 추가되었습니다.")
            console.log(res.data.msg);
        })
    }

    return (
        <div className="Book">
            {filterBook.map((book) => (
                <div key={book.book_id} className="BookItem">
                    <h2>{book.book_name}</h2>
                    <p>가격: {book.price}원</p>
                    <p>재고량: {book.stock}개</p>
                    <span>
                        <button onClick={() => quantityMinus(book.book_id)}>-</button>
                        <input className="countBook" type="number" value={count[book.book_id]} />
                        <button onClick={() => quantityPlus(book.book_id, book.stock)}>+</button>
                    </span>
                    <button onClick={() => { addCart(book) }}>장바구니</button>
                </div>
            ))}
        </div>
    )
};

export default Book;