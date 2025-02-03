import { useParams } from "react-router-dom"; //URL에 포함된 파라미터 값 가져오는 역할을 하는 훅훅
import BookInfo from "./BookData";
import Header from "./Header";
import "../styles/InfoBook.css";

function InfoBook({ cartList, setCartList, count, setCount }) {
    const { id } = useParams(); //URL에서 id를 가져온다

    const book = BookInfo.find((b) => b.id === Number(id)); //id로 해당 책 찾기

    //handlePlus, handleMinus는 InfoBook의 수량 조절 시 사용
    const handlePlus = () => {
        setCount(count + 1);
    };

    const handleMinus = () => {
        setCount(Math.max(count - 1, 1));
    }

    //장바구니 추가 함수
    const addCart = () => {
        const bookAndCount = {...book, count};

        const isBook = cartList.find(newitem => newitem.id === book.id); //장바구니에 넣으려는 책이 이미 있는지(T/F)

        if (isBook) { //이미 있으면
            const newCartList = cartList.map(newitem => {
                if (newitem.id === book.id) {
                    return {...newitem, count: newitem.count + count}; //새로운 책, 새로운 책 수량
                }
                return newitem; //업데이트할 책이 없으면 그대로 유지
            });
            setCartList(newCartList) //장바구니 목록에 newCartList로 대체
        } else { //없으면 장바구니에 그냥 추가
            setCartList([...cartList, bookAndCount])
        };
        
        alert(`${book.title}이(가) 장바구니에 추가되었습니다.`)
        setCount(1); //장바구니 넣으면 다시 1로 초기화
    };

    const bookPrice = book.price; //가격 변수

    return (
        <div className="InfoBook">
            <Header />
            <div className="InfoContainer">
                <h2>{book.title}</h2>
                <p>가격: {book.price}원</p>
                <p>재고량: {book.stock}개</p>
            </div>
            <div className="InfoFooter">
                <span>총 상품 금액 {bookPrice * count}원</span>
                <span>
                    <button onClick={handleMinus}>-</button>
                    <input className="CountInput" type="number" value={count} readOnly />
                    <button onClick={handlePlus}>+</button>
                </span>
                <button onClick={addCart}>장바구니 담기</button>
            </div>
        </div>
    )
};

export default InfoBook;