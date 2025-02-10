import React from "react";
import Book from "./Book";
import '../styles/Container.css';

function Container({ count, setCount, filterBook }) {
    const bookList = filterBook || []
    return (
        <div className="Container">
            {bookList.length > 0 ? (
                <Book filterBook={bookList} count={count} setCount={setCount} />
            ) : (
                <div className="noResult">
                    <h3>검색 결과가 없습니다.</h3>
                    <p>다른 검색어를 입력해 주세요.</p>
                </div>
            )}
        </div>
    )
};

export default Container;