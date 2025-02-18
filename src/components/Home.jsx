import React, { useEffect } from "react";
import Container from "./Container";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home({ search, setSearch, count, setCount, setBookInfo, bookInfo, filterBook }) {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/book").then((res) => {
            console.log(res.data.list);
            setBookInfo(res.data.list);
            console.log(res.data.user);
        })
        axios.get("http://localhost:4000/").then((res) => {
            console.log(res.data.user);
        })
    }, [])

    const handleBuyNow = (book) => {
        navigate("/Order", {
            state: {
                list: [book],
                total: book.price * count[book.book_id],
                quantity: count[book.book_id],
                type: "book"
            }
        });
    };

    return (
        <div className="Home">
            <Header search={search} setSearch={setSearch} type={"search"}/>
            <Container
                count={count}
                setCount={setCount}
                setBookInfo={setBookInfo}
                bookInfo={bookInfo}
                filterBook={filterBook}
                handleBuyNow={handleBuyNow}
            />
            <Footer />
        </div>
    )
};

export default Home;
