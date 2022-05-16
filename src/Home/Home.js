import React from "react";
import Background from "../Background/Background";
import "./Home.css";
import Title from "./Title";

function Home() {
    return (
        <>
            <Background />
            <div className="home">
                <Title title="Pianime" subtitle="Anime Piano Arrangements" />
                <div className="home__header">Most Recent Arrangement</div>
            </div>
        </>
    );
}

export default Home;
