import React from "react";
import "../styles/Book.css";
import { useNavigate } from "react-router-dom";
import BookInfo from "./BookData";

function Book( {setCount} ) {
    const navigate = useNavigate();

    const goBookInfo = (id) => {
        setCount(1);
        navigate(`/book/${id}`)
    }

    return (
        <div className="Book">
            <div className="Books">
                {BookInfo.map((book) => (
                    <div
                        key={book.id}
                        className="BookItem"
                        onClick={() => goBookInfo(book.id)}
                    >
                        {book.title}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Book;