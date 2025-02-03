import React from "react";
import { useParams } from "react-router-dom"; //URL에 포함된 파라미터 값 가져오는 역할을 하는 훅훅
import BookInfo from "./BookData";
import Header from "./Header";
import "../styles/InfoBook.css";

function InfoBook({ cartList, setCartList }) {
    const { id } = useParams();
    const book = BookInfo.find((b) => b.id === Number(id)); //id로 해당 책 찾기
    const addCart = () => {
        setCartList([...cartList, book]);
        alert(`${book.title}이(가) 장바구니에 추가되었습니다.`)
    }
    const bookPrice = book.price;
    return (
        <div className="InfoBook">
            <Header />
            <div className="InfoContainer">
                <h2>{book.title}</h2>
                <p>가격: {book.price}원</p>
                <p>재고량: {book.stock}개</p>
            </div>
            <div className="InfoFooter">
                <span>총 상품 금액 {bookPrice}원</span>
                <span>
                    <button>-</button>
                    <input type="number" value="1"/>
                    <button>+</button>
                </span>
                <button onClick={addCart}>장바구니 담기</button>
            </div>
        </div>
    )
};

export default InfoBook;