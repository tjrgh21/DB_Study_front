import React from "react";
import Book from "./Book";
import '../styles/Container.css';

function Container({ setCount }) {
    return (
        <div className="Container">
            <Book setCount={setCount}/>
        </div>
    )
};

export default Container;