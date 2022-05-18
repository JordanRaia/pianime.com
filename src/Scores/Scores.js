import React from "react";
import ScoreDisplay from "./ScoreDisplay";
import "./Scores.css";

function Scores() {
    return (
        <div className="scores">
            <ScoreDisplay songTitle="My War"/>
        </div>
    );
}

export default Scores;
