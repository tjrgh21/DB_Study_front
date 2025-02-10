import React from "react";
import Book from "./Book";
import '../styles/Container.css';

function Container({ count, setCount, search, bookInfo }) {
    const filterBook = bookInfo ? (
        search === ""
            ? bookInfo
            : bookInfo.filter(book =>
                book.book_name.includes(search)
            )
    ) : [];

    return (
        <div className="Container">
            {filterBook.length > 0 ? (
                <Book filterBook={filterBook} count={count} setCount={setCount} />
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