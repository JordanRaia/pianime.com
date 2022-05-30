import i18next from "i18next";
import React from "react";
import "./Title.css";

function Title({ title, subtitle }) {
    return (
        <div className="title">
            <div className={`title__title${i18next.language}`}>{title}</div>
            <div className={`title__subtitle${i18next.language}`}>{subtitle}</div>
        </div>
    );
}

export default Title;
