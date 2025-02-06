import React from "react";
import Container from "./Container";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Home.css";

function Home({search, setSearch, count, setCount}) {
    return (
        <div className="Home">
            <Header search={search} setSearch={setSearch} />
            <Container search={search} count={count} setCount={setCount}/>
            <Footer />
        </div>
    )
};

export default Home;