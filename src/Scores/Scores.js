import React from "react";
import ScoreDisplay from "./ScoreDisplay";
import "./Scores.css";

function Scores() {
    return (
        <div className="scores">
            <ScoreDisplay songTitle="Akuma no Ko"/>
        </div>
    );
}

export default Scores;
