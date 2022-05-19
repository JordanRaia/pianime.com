import React from "react";
import "./Title.css";

function Title({ title, subtitle }) {
    return (
        <div className="title">
            <div className="title__title">{title}</div>
            <div className="title__subtitle">{subtitle}</div>
        </div>
    );
}

export default Title;
