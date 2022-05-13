import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

function Header({ a }) {
    var headerOption = [
        "header__option",
        "header__option",
        "header__option",
        "header__option",
        "header__option",
        "header__option"
    ];

    //headerOption(5).fill("header__option");

    switch (a) {
        case "home":
            headerOption[0] = "header__optionActive";
            break;
        case "scores":
            headerOption[1] = "header__optionActive";
            break;
        case "requests":
            headerOption[2] = "header__optionActive";
            break;
        case "beatsaber":
            headerOption[3] = "header__optionActive";
            break;
        case "contact":
            headerOption[4] = "header__optionActive";
            break;
        case "donate":
            headerOption[5] = "header__optionActive";
            break;
    }

    return (
        <div className="header">
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Anton"
            />
            <div className="header__nav">
                <Link className="header__link" to="/">
                    <div className={headerOption[0]}>
                        <div className="header__optionText">Home</div>
                    </div>
                </Link>
                <Link className="header__link" to="/">
                    <div className={headerOption[1]}>
                        <div className="header__optionText">Scores</div>
                    </div>
                </Link>
                <Link className="header__link" to="/">
                    <div className={headerOption[2]}>
                        <div className="header__optionText">Song Requests</div>
                    </div>
                </Link>
                <Link className="header__link" to="/">
                    <div className={headerOption[3]}>
                        <div className="header__optionText">Beat Saber</div>
                    </div>
                </Link>
                <Link className="header__link" to="/">
                    <div className={headerOption[4]}>
                        <div className="header__optionText">Contact</div>
                    </div>
                </Link>
                <Link className="header__link" to="/">
                    <div className={headerOption[5]}>
                        <div className="header__optionText">Donate</div>
                    </div>
                </Link>
            </div>
            <div className="header__search">
                <input
                    type="text"
                    className="header__searchInput"
                    placeholder="Search for Song Name or Anime Title"
                />
                <SearchIcon className="header__searchIcon" />
            </div>
        </div>
    );
}

export default Header;
