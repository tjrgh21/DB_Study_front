import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../styles/Cart.css";
import axios from "axios";


function Cart() {
    const [cartBookInfo, setCartBookInfo] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/cartBook").then((res) => {
            console.log(res.data.cartList);
            setCartBookInfo(res.data.cartList);
        })
    }, [])

    //GPT 도움
    //증가
    const cartQuantityPlus = (cart_book_list_id, stock, book_id, currentQuantity) => {
        const newQuantity = Math.min(currentQuantity +1, stock);
        console.log("수량 증가:", { cart_book_list_id, book_id, newQuantity });

        setCartBookInfo((prevCart) =>
            prevCart.map((book) =>
                book.cart_book_list_id === cart_book_list_id
                    ? { ...book, quantity: newQuantity }
                    : book
            )
        );
        axios.post("http://localhost:4000/cartBook", { //DB에 저장하고
            cart_book_list_id,
            book_id,
            quantity: newQuantity
        }).then((res) => { //다시 불러오기
            console.log(res.data.msg);
            axios.get("http://localhost:4000/cartBook").then((res) => {
                setCartBookInfo(res.data.cartList);
            });
        });
    };

    //감소
    const cartQuantityMinus = (cart_book_list_id, book_id, currentQuantity) => {
        const newQuantity = Math.max(currentQuantity -1, 1);
        console.log("수량 감소:", { cart_book_list_id, book_id, newQuantity });

        setCartBookInfo((prevCart) =>
            prevCart.map((book) =>
                book.cart_book_list_id === cart_book_list_id
                    ? { ...book, quantity: newQuantity }
                    : book
            )
        );
        axios.post("http://localhost:4000/cartBook", {
            cart_book_list_id,
            book_id,
            quantity: newQuantity
        }).then((res) => {
            console.log(res.data.msg);
            axios.get("http://localhost:4000/cartBook").then((res) => {
                setCartBookInfo(res.data.cartList);
            });
        });
    };

    //삭제
    const delBook = (cart_book_list_id) => {
        axios.post("http://localhost:4000/deleteCartBook", {
            cart_book_list_id
        }).then((res) => {
            console.log(res.data.msg);
            axios.get("http://localhost:4000/cartBook").then((res) => {
                setCartBookInfo(res.data.cartList);
            })
        })
    }

    return (
        <div className="Cart">
            <Header />
            <h2>장바구니 목록</h2>
            {cartBookInfo.map((book) => (
                <div key={book.cart_book_list_id} className="cartBookList">
                    <h3>{book.book_name}</h3>
                    <div>{book.price}원</div>
                    <div>재고량: {book.stock}권</div>
                    <span>
                        <button onClick={() => cartQuantityMinus(book.cart_book_list_id, book.book_book_id, book.order_quantity)}>-</button>
                        <input type="number" className="cartCountBook" value={book.order_quantity} />
                        <button onClick={() => cartQuantityPlus(book.cart_book_list_id, book.stock, book.book_book_id, book.order_quantity)}>+</button>
                    </span>
                    <button className="delBtn" onClick={()=>delBook(book.cart_book_list_id)}>삭제</button>
                </div>
            ))}
            <h2 className="totalPrice">총 결제 금액: { }</h2>
        </div>
    )
};

export default Cart;

//<p>장바구니가 비어 있습니다.</p>