import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function RightHeader({ headerOption, open }) {
    return (
        <div className={!open ? "header__nav" : "header__navOnClick"}>
            <Link className="header__link" to="/">
                <div className={headerOption[0]}>
                    <div className="header__optionText">Home</div>
                </div>
            </Link>
            <Link className="header__link" to="/Sheet Music">
                <div className={headerOption[1]}>
                    <div className="header__optionText">Sheet Music</div>
                </div>
            </Link>
            {/* <Link className="header__link" to="/">
                <div className={headerOption[2]}>
                    <div className="header__optionText">Song Requests</div>
                </div>
            </Link>
            <Link className="header__link" to="/">
                <div className={headerOption[3]}>
                    <div className="header__optionText">Beat Saber</div>
                </div>
            </Link> */}
            <Link className="header__link" to="/Contact">
                <div className={headerOption[4]}>
                    <div className="header__optionText">Contact</div>
                </div>
            </Link>
            <div className="header__invisibleOnDesktop">
                <Link className="header__link" to="/Donate">
                    <div className={headerOption[5]}>
                        <div className="header__optionText">Donate</div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default RightHeader;
