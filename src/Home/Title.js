import React from "react";
import "./Title.css";

function Title({ title, subtitle, }) {
    return (
        <>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Dosis:wght@800&display=swap"
            />
            <div className="title">
                <div className="title__title">{title}</div>
                <div className="title__subtitle">{subtitle}</div>
            </div>
        </>
    );
}

export default Title;
