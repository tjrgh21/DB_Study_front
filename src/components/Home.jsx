import React, { useEffect } from "react";
import Container from "./Container";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Home.css";
import axios from "axios";

function Home({ search, setSearch, count, setCount, setBookInfo, bookInfo, filterBook }) {
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

    return (
        <div className="Home">
            <Header search={search} setSearch={setSearch} />
            <Container
                count={count}
                setCount={setCount}
                setBookInfo={setBookInfo}
                bookInfo={bookInfo}
                filterBook={filterBook}
            />
            <Footer />
        </div>
    )
};

export default Home;