import React from "react";
import "./Home.css";
import Title from "./Title";
import ScoreDisplay from "../Scores/ScoreDisplay";
import "../Background/Background.css"

function Home() {
    return (
        <>
            <div className="home">
                <Title title="Pianime" subtitle="Anime Piano Arrangements" />
                <div className="home__header">Most Recent Arrangement</div>
                {/* <ScoreDisplay /> */}
            </div>
        </>
    );
}

export default Home;
