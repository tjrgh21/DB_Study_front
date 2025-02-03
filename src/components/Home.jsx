import React from "react";
import Container from "./Container";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Home.css";

function Home() {
    return (
        <div className="Home">
            <Header />
            <Container />
            <Footer />
        </div>
    )
};

export default Home;