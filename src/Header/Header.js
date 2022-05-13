import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Hamburger from "./Hamburger";

function Header({ a }) {
    var headerOption = [
        "header__option",
        "header__option",
        "header__option",
        "header__option",
        "header__option",
        "header__option"
    ];

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
            <div className="header__search">
                <input
                    type="text"
                    className="header__searchInput"
                    placeholder="Search for Song Title or Anime Series"
                />
                <SearchIcon className="header__searchIcon" />
            </div>
            <Hamburger headerOption={headerOption}/>
        </div>
    );
}

export default Header;
