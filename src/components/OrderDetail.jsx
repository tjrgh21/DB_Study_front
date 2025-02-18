import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

function OrderDetail() {
    const { order_id } = useParams();
    console.log("URL에서 가져온 order_id:", order_id);
    const [orderDetail, setOrderDetail] = useState(null);

    useEffect(() => {
        if (order_id) {
            axios.get(`http://localhost:4000/orderDetail/${order_id}`)
                .then(res => {
                    console.log('주문 상세 응답:', res.data); // 응답을 콘솔에 찍어 확인
                    setOrderDetail(res.data.orderDetail);
                })
                .catch(err => {
                    console.error("주문 상세 가져오기 오류:", err);
                });
        }
    }, [order_id]);
    

    return (
        <div className="OrderDetail-Container">
            <Header/>
            <h1>주문 상세</h1>
            {orderDetail ? (
                <div>
                    <h3>주문 번호: {orderDetail.order_id}</h3>
                    <p>주문 날짜: {orderDetail.order_date}</p>
                    <p>총 가격: {orderDetail.total_price}원</p>
                    <ul>
                        {orderDetail.books.map((book) => (
                            <li key={book.order_booklist_id}>
                                <p>도서명: {book.book_name}</p>
                                <p>가격: {book.order_price}원</p>
                                <p>수량: {book.order_quantity}개</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>주문 정보를 불러오는 중입니다...</p>
            )}
        </div>
    );
    
}

export default OrderDetail;
