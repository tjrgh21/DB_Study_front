import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../styles/Cart.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Cart() {
    const [cartBookInfo, setCartBookInfo] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    //장바구니 데이터 가져오기
    const fetchCartData = () => {
        axios.get("http://localhost:4000/cartBook").then((res) => {
            setCartBookInfo(res.data.cartList);
            totalBookPrice(res.data.cartList);
        });
    };

    useEffect(() => {
        axios.get("http://localhost:4000/cartBook").then((res) => {
            console.log(res.data.cartList);
            setCartBookInfo(res.data.cartList);
        })
        fetchCartData();
    }, [])

    //총 결제 금액
    const totalBookPrice = (cartList) => {
        let total = 0;
        cartList.map(book => total += book.price * book.order_quantity);
        setTotalPrice(total);
    };

    //수량 증가
    const cartQuantityPlus = (cart_book_list_id, stock, book_id, currentQuantity) => {
        if (currentQuantity >= stock) {
            alert("재고량을 초과할 수 없습니다.");
            return;
        }

        // const newQuantity = currentQuantity + 1;

        axios.post("http://localhost:4000/updateCartQuantity", {
            // cart_book_list_id,
            book_id,
            increase: true
        }).then((res) => {
            console.log(res.data.msg);
            fetchCartData(); //최신 장바구니 데이터 불러오기
        });
    };

    //수량 감소
    const cartQuantityMinus = (cart_book_list_id, book_id, currentQuantity) => {
        if (currentQuantity <= 1) {
            alert("최소 주문 수량은 1개입니다.");
            return;
        }

        // const newQuantity = currentQuantity - 1;

        axios.post("http://localhost:4000/updateCartQuantity", {
            // cart_book_list_id,
            book_id,
            increase: false
        }).then((res) => {
            console.log(res.data.msg);
            fetchCartData(); //최신 장바구니 데이터 불러오기
        });
    };

    //삭제
    const delBook = (cart_book_list_id) => {
        axios.post("http://localhost:4000/deleteCartBook", {
            cart_book_list_id
        }).then((res) => {
            console.log(res.data.msg);
            fetchCartData(); //최신 장바구니 데이터 불러오기
        });
    };

    //장바구니 구매
    const cartBuy = () => {
        navigate("/Order", {
            state: {
                list: cartBookInfo,
                total: totalPrice,
                quantity: cartBookInfo.reduce((acc, book) => acc + book.order_quantity, 0),
                type: "cart"
            }
        })
    }

    return (
        <div className="Cart">
            <Header/>
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
                    <button className="delBtn" onClick={() => delBook(book.cart_book_list_id)}>삭제</button>
                </div>
            ))}
            <h2 className="totalPrice">총 결제 금액: {totalPrice.toLocaleString()}원</h2>
            <button onClick={cartBuy}>구매</button>
        </div>
    )
};

export default Cart;
//toLocaleString => 천 단위 콤마 표시
//<p>장바구니가 비어 있습니다.</p>