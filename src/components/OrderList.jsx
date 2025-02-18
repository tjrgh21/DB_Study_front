import axios from "axios";
import Header from "./Header";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

function OrderList() {
    const [orderData, setOrderData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/orderBookList")
            .then(res => {
                setOrderData(res.data.orderList);
            })
            .catch(error => {
                console.error("주문 내역 가져오기 오류:", error);
            });
    }, []);

    return (
        <div className="OrderList-Container">
            <Header />
            <h1>주문 내역</h1>
            {orderData.length === 0 ? (
                <p>주문 내역이 없습니다.</p>
            ) : (
                orderData.map((order) => (
                    <div key={order.order_id}>
                        <h3>주문 번호: {order.order_id}</h3>
                        <p>주문 날짜: {order.order_date}</p>
                        <p>총 가격: {order.total_price}원</p>
                        <Link to={`/orderDetail/${order.order_id}`}>
                            <button>상세 보기</button>
                        </Link>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default OrderList;
