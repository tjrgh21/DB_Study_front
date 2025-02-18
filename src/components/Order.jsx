import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

axios.defaults.withCredentials = true;

function Order() {
    const loc = useLocation();
    const navigate = useNavigate();

    const [orderItems, setOrderItems] = useState({
        arr: loc.state?.list,
        total: loc.state?.total,
        quan: loc.state?.quantity,
    });
    console.log(orderItems.arr);

    const [cardInfo, setCardInfo] = useState([]);
    const [addrInfo, setAddrInfo] = useState([]);
    const [selectedAddr, setSelectedAddr] = useState("");
    const [selectedCard, setSelectedCard] = useState("");
    const type = loc.state?.type;

    useEffect(() => {
        axios.get("http://localhost:4000/mypage")
        .then(res => {
            setCardInfo(res.data.card || []);
            setAddrInfo(res.data.address || []);
        })
        .catch(error => {
            console.error("마이페이지 정보 가져오기 오류:", error);
        });
    }, []);

    const handleCardSelect = (card) => {
        setSelectedCard(card.card_id);
    };

    const handleAddressSelect = (address) => {
        setSelectedAddr(address.address_id);
    };

    const handleOrder = async () => {
        if (!selectedCard || !selectedAddr) {
        alert("카드와 주소를 선택해주세요.");
        return;
        }

        const selectedAddrInfo = addrInfo.find((addr) => addr.address_id === selectedAddr);
        const selectedCardInfo = cardInfo.find((card) => card.card_id === selectedCard);

        const orderData = {
            order_id: Date.now().toString(), // order_id 추가
            total_price: orderItems.total,
            total_quantity: orderItems.quan,
            base_address: selectedAddrInfo.address,
            detailed_address: selectedAddrInfo.detailed_address,
            postal_code: selectedAddrInfo.postal_code,
            card_id: selectedCardInfo.card_id,
            expiration_date: selectedCardInfo.expiration_date,
            card_company: selectedCardInfo.card_company,
            orderItems: orderItems.arr.map(item => ({ // 백엔드에 필요한 정보만 전달
                book_book_id: item.book_id, //바로구매의 경우 book_id이지만 장바구니 구매 경우 book_book_id
                order_quantity: orderItems.quan,
                order_price: item.price
            }))
        };
        console.log("orderItems 배열:", orderItems);
        orderItems.arr.forEach(item => console.log("각 아이템:", item));

        try {
        const response = await axios.post("http://localhost:4000/order", orderData);
        alert(response.data.msg);
        navigate("/OrderList", { state: { orderId: response.data.order_id } });
        } catch (error) {
        console.error("주문 생성 오류:", error);
        alert("주문에 실패했습니다.");
        }
    };

    return (
        <div className="Order-Container">
        <Header/>
        <h1>주문 페이지</h1>
        <h3>주문도서 정보</h3>
        <ul>
                {orderItems.arr.map((item, idx) => (
                    <li key={idx}>
                        도서명: {item.book_name} <br/>
                        수량: {item.order_quantity || orderItems.quan}권 <br/>
                        가격: {item.price * (item.order_quantity || orderItems.quan)}원
                    </li>
                ))}
            </ul>
        <div>총 수량: {orderItems.quan}권</div>
        <div>총 가격: {orderItems.total}원</div>

        <h3>카드정보</h3>
        {cardInfo.map((card, idx) => (
            <div key={idx}>
            <input
                type="radio"
                value={card.cardId}
                name="card"
                onChange={() => handleCardSelect(card)}
                checked={card.card_id === selectedCard}
            />
            <label>
                카드번호: {card.card_id} / 유효기간: {card.expiration_date} / 카드사:
                {card.card_company}
            </label>
            </div>
        ))}

        <h3>배송지정보</h3>
        {addrInfo.map((addr, idx) => (
            <div key={idx}>
            <input
                type="radio"
                value={addr.address_id}
                name="addr"
                onChange={() => handleAddressSelect(addr)}
                checked={addr.address_id === selectedAddr}
            />
            <label>
                우편번호: {addr.postal_code} / 기본주소: {addr.address} / 상세주소:{" "}
                {addr.detailed_address}
            </label>
            </div>
        ))}

        <hr />
        <button onClick={handleOrder}>주문하기</button>
        </div>
    );
}

export default Order;
