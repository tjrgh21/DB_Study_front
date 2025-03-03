import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/Order.css';
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
    console.log(orderItems);

    const [cardInfo, setCardInfo] = useState([]);
    const [addrInfo, setAddrInfo] = useState([]);
    const [couponInfo, setCouponInfo] = useState([]);
    const [selectedAddr, setSelectedAddr] = useState("");
    const [selectedCard, setSelectedCard] = useState("");
    const [selectedCoupons, setSelectedCoupons] = useState({});
    const type = loc.state?.type;
    console.log(type);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mypageRes, couponRes] = await Promise.all([
                    axios.get("http://localhost:4000/mypage"),
                    axios.get("http://localhost:4000/coupon")
                ]);
    
                setCardInfo(mypageRes.data.card || []);
                setAddrInfo(mypageRes.data.address || []);
                setCouponInfo(couponRes.data.couponList || []);
    
                // 할인된 가격 초기 계산
                setOrderItems((prevOrderItems) => {
                    const updatedArr = prevOrderItems.arr.map((item) => ({
                        ...item,
                        coupon_id: null, // 기본적으로 쿠폰 선택 안 함
                    }));

                    const updatedWithDiscount = calculateDiscountedItems(updatedArr);

                    return {
                        ...prevOrderItems,
                        arr: updatedWithDiscount,
                        total: updatedWithDiscount.reduce((acc, item) => acc + item.discounted_price, 0),
                    };
                });
    
            } catch (error) {
                console.error("데이터 로딩 오류:", error);
            }
        };
    
        fetchData();
    }, []);
    

    const handleCardSelect = (card) => {
        setSelectedCard(card.card_id);
    };

    const handleAddressSelect = (address) => {
        setSelectedAddr(address.address_id);
    };

    const calculateDiscountedItems = (items) => {
        return items.map((item) => {
            const selectedCoupon = couponInfo.find(coupon => coupon.coupon_id === item.coupon_id);
            let originalTotalPrice = (item.price ?? 0) * (item.order_quantity ?? 1); // (가격 * 수량)
            let discountedPrice = originalTotalPrice; // 기본값 설정

            if (selectedCoupon) {
                if (selectedCoupon.discount_rate === 1) {
                    // 퍼센트 할인
                    discountedPrice = Math.floor(originalTotalPrice * (1 - selectedCoupon.discount / 100));
                } else {
                    // 정액 할인
                    discountedPrice = Math.max(originalTotalPrice - selectedCoupon.discount, 0);
                }
            }

            return { ...item, discounted_price: discountedPrice };
        });
    };

    const handleCouponSelectForItem = (idx, couponId) => {
        setOrderItems((prevOrderItems) => {
            // 쿠폰을 선택 안 함을 클릭한 경우, 해당 도서의 쿠폰을 해제하고 모든 선택창을 활성화
            if (couponId === "") {
                setSelectedCoupons((prev) => {
                    const newCoupons = { ...prev };
                    delete newCoupons[idx]; // 해당 도서의 쿠폰 정보 제거
                    return newCoupons;
                });
            } else {
                setSelectedCoupons((prev) => ({
                    ...prev,
                    [idx]: couponId, // 해당 도서에 선택된 쿠폰 저장
                }));
            }
    
            const updatedArr = prevOrderItems.arr.map((item, index) =>
                index === idx
                    ? { ...item, coupon_id: couponId ? Number(couponId) : null }
                    : item
            );
    
            // 할인 적용된 새 배열
            const updatedWithDiscount = calculateDiscountedItems(updatedArr);
    
            // 총 가격 계산: 각 아이템의 (할인가)을 합산
            const newTotal = updatedWithDiscount.reduce(
                (acc, item) => acc + item.discounted_price, 0
            );
    
            return { ...prevOrderItems, arr: updatedWithDiscount, total: newTotal };
        });
    };

    const handleOrder = async () => {
        if (!selectedCard || !selectedAddr) {
            alert("카드와 주소를 선택해주세요.");
            return;
        }

        const selectedAddrInfo = addrInfo.find((addr) => addr.address_id === selectedAddr);
        const selectedCardInfo = cardInfo.find((card) => card.card_id === selectedCard);

        const orderData = {
            order_id: Date.now().toString(),
            total_price: orderItems.total,
            total_quantity: orderItems.quan,
            base_address: selectedAddrInfo.address,
            detailed_address: selectedAddrInfo.detailed_address,
            postal_code: selectedAddrInfo.postal_code,
            card_id: selectedCardInfo.card_id,
            expiration_date: selectedCardInfo.expiration_date,
            card_company: selectedCardInfo.card_company,
            type: type,
            orderItems: orderItems.arr.map(item => ({
                book_book_id: type === 'cart' ? item.book_book_id : item.book_id,
                order_quantity: type === 'cart' ? item.order_quantity : orderItems.quan,
                order_price: item.price,
                coupon_id: item.coupon_id || null
            }))
        };

        console.log("쿠폰아이디",selectedCoupons[0])

        try {
            const response = await axios.post("http://localhost:4000/order", orderData);
            // const coupon = await axios.post("http://localhost:4000/coupon", {couponId : selectedCoupons});
            alert(response.data.msg);
            navigate("/OrderList", { state: { orderId: response.data.order_id } });
        } catch (error) {
            console.error("주문 생성 오류:", error);
            alert("주문에 실패했습니다.");
        }
    };

    return (
        <div className="Order-Container">
            <Header />
            <h1>주문 페이지</h1>
            <h3>주문도서 정보</h3>
            <ul>
                {orderItems.arr.map((item, idx) => (
                    <li key={idx}>
                        도서명: {item.book_name} <br />
                        도서 가격: {item.price}원 <br />
                        수량: {item.order_quantity || orderItems.quan}권 <br />
                        가격: {item.discounted_price}원 <br />

                        <div>
                            <input 
                                type="radio" 
                                id={`couponNone-${idx}`} 
                                name={`coupon-${idx}`} 
                                value=""
                                onChange={() => handleCouponSelectForItem(idx, "")} 
                                checked={item.coupon_id === null} // 기본적으로 "쿠폰 선택 안 함"이 선택된 상태로
                                disabled={Object.keys(selectedCoupons).length > 0 && !selectedCoupons[idx]} // 다른 도서에서 쿠폰을 선택했다면, 해당 도서만 선택 가능
                            />
                            <label htmlFor={`couponNone-${idx}`}>쿠폰 선택 안 함</label>

                            {couponInfo.map((coupon) => (
                                <div key={coupon.coupon_id}>
                                    <input 
                                        type="radio" 
                                        id={`coupon-${coupon.coupon_id}-${idx}`} 
                                        name={`coupon-${idx}`} 
                                        value={coupon.coupon_id}
                                        onChange={() => handleCouponSelectForItem(idx, coupon.coupon_id)} 
                                        checked={item.coupon_id === coupon.coupon_id}
                                        disabled={Object.keys(selectedCoupons).length > 0 && !selectedCoupons[idx] && item.coupon_id !== coupon.coupon_id} // 다른 도서에서 쿠폰을 선택했다면, 해당 도서만 선택 가능
                                    />
                                    <label htmlFor={`coupon-${coupon.coupon_id}-${idx}`}>
                                        {coupon.discount}
                                        {coupon.discount_rate === 1 ? "% 할인" : "원 할인"}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>

            <div>총 수량: {orderItems.quan}권</div>
            <div>총 가격: {orderItems.total}원</div>

            <h3>카드정보</h3>
            {cardInfo.map((card, idx) => (
                <div className="infoBox" key={idx}>
                    <label>
                        카드번호: {card.card_id} / 유효기간: {card.expiration_date} / 카드사: {card.card_company}
                    </label>
                    <input
                        type="radio"
                        value={card.card_id}
                        name="card"
                        onChange={() => handleCardSelect(card)}
                        checked={card.card_id === selectedCard}
                    />
                </div>
            ))}

            <h3>배송지정보</h3>
            {addrInfo.map((addr, idx) => (
                <div className="infoBox" key={idx}>
                    <label>
                        우편번호: {addr.postal_code} / 기본주소: {addr.address} / 상세주소: {addr.detailed_address}
                    </label>
                    <input
                        type="radio"
                        value={addr.address_id}
                        name="addr"
                        onChange={() => handleAddressSelect(addr)}
                        checked={addr.address_id === selectedAddr}
                    />
                </div>
            ))}

            <hr />
            <button onClick={handleOrder}>주문하기</button>
        </div>
    );
}

export default Order;
