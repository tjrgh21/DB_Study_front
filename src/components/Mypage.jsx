import React, { useEffect, useState } from "react";
import '../styles/Mypage.css';
import axios from "axios";

function MyPage() {
    const [userData, setUserData] = useState({ card: [], address: [] });
    const [newCard, setNewCard] = useState({ card_id: "", expiration_date: "", card_company: "" });
    const [newAddress, setNewAddress] = useState({ postal_code: "", address: "", detailed_address: "" });

    useEffect(() => {
        axios.get("http://localhost:4000/mypage").then(res => {
            setUserData(prev => ({ ...prev, card: res.data.card || [], address: res.data.address || [] }));
        })

        axios.get("http://localhost:4000/user").then(res => {
            setUserData(prev => ({ ...prev, id: res.data.id, name: res.data.name }));
        })

    }, []);

    const handleAddCard = () => {
        axios.post("http://localhost:4000/credit", { credit: newCard }).then(() => window.location.reload())
    };

    const handleDeleteCard = (card_id) => {
        axios.post("http://localhost:4000/deleteCard", { card_id: { card_id } }).then((res) =>
            window.location.reload())
    };

    const handleAddAddress = () => {
        axios.post("http://localhost:4000/address", { address: newAddress }).then(() => window.location.reload())
    };

    const handleDeleteAddress = (address_id) => {
        axios.post("http://localhost:4000/deleteAddress", { address_id: { address_id } }).then(() => window.location.reload())
    };

    return (
        <div>
            <h2>마이페이지</h2>
            <p><strong>아이디:</strong> {userData.id}</p>
            <p><strong>이름:</strong> {userData.name}</p>

            <h3>카드 목록</h3>
            {userData.card.length > 0 ? (
                <ul>
                    {userData.card.map((card, index) => (
                        <li key={index}>
                            {card.card_company} - {card.card_id} ({card.expiration_date})
                            <button className="DelBtn" onClick={() => handleDeleteCard(card.card_id)}>삭제</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>등록된 카드가 없습니다.</p>
            )}
            <input type="number" placeholder="카드 번호" onChange={(e) => setNewCard({ ...newCard, card_id: e.target.value })} />
            <input type="date" placeholder="유효 기간" onChange={(e) => setNewCard({ ...newCard, expiration_date: e.target.value })} />
            <input type="text" placeholder="카드사" onChange={(e) => setNewCard({ ...newCard, card_company: e.target.value })} />
            <button onClick={handleAddCard}>카드 추가</button>

            <h3>주소 목록</h3>
            {userData.address.length > 0 ? (
                <ul>
                    {userData.address.map((addr, index) => (
                        <li key={index}>
                            {addr.address} ({addr.postal_code}) {addr.detailed_address}
                            <button className="DelBtn" onClick={() => handleDeleteAddress(addr.address_id)}>삭제</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>등록된 주소가 없습니다.</p>
            )}
            <input type="number" placeholder="우편번호" onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })} />
            <input type="text" placeholder="기본 주소" onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} />
            <input type="text" placeholder="상세 주소" onChange={(e) => setNewAddress({ ...newAddress, detailed_address: e.target.value })} />
            <button onClick={handleAddAddress}>주소 추가</button>
        </div>
    );
}


export default MyPage;
