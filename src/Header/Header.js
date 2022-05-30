import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";
import Hamburger from "./Hamburger";
import logo from "../img/logo.png";
import i18next, { t } from "i18next";
import Language from "./Language";

function Header({ a }) {
    const [colorChange, setColorchange] = useState(false);
    const [langaugeButton, setLanguageButton] = useState(true);

    const changeNavbarColor = () => {
        if (window.scrollY >= 80) {
            setColorchange(true);
        } else {
            setColorchange(false);
        }
    };

    window.addEventListener("scroll", changeNavbarColor);
    var x = window.matchMedia("(max-width: 768px)");

    function visability(x) {
        if (x.matches) {
            setLanguageButton(false);
        } else {
            setLanguageButton(true);
        }
    }

    useEffect(() => {
        visability(x);
        x.addEventListener("change", () => {
            visability(x)});
    })

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
        default:
            console.log(a + " is not a valid header item.");
    }

    return (
        <div className={colorChange ? "header__background" : "header"}>
            <div className="header__container">
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Anton"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap"
                />
                <Link to={"/"}>
                    <img
                        className="header__logo"
                        src={logo}
                        alt="PiAnime Logo"
                    />
                </Link>
                <div className="header__center">
                    <Hamburger headerOption={headerOption} />
                </div>
                {langaugeButton && <Language />}
                <a
                    className="header__link"
                    href="https://www.buymeacoffee.com/PiAnime"
                >
                    <div className="header__optionDonate">
                        <div
                            className={`header__optionText${i18next.language}`}
                        >
                            {t("donate")}
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Header;
