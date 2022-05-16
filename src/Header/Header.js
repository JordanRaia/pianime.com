import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";
import Hamburger from "./Hamburger";
import logo from "../img/logo.png";

function Header({ a }) {
    const [colorChange, setColorchange] = useState(false);

    const changeNavbarColor = () => {
        if (window.scrollY >= 80) {
            setColorchange(true);
        } else {
            setColorchange(false);
        }
    };

    window.addEventListener('scroll', changeNavbarColor);

    var headerOption = [
        "header__option",
        "header__option",
        "header__option",
        "header__option",
        "header__option",
        "header__option",
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
        <div className={colorChange ? "header__background" : "header"}>
            <div className="header__container">
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Anton"
                />
                <Link to={"/"}>
                    <img className="header__logo" src={logo} />
                </Link>
                <div className="header__center">
                    <Hamburger headerOption={headerOption} />
                </div>
                <Link className="header__link" to="/">
                    <div className="header__optionDonate">
                        <div className="header__optionText">Donate</div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Header;
