import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import i18next, { t } from "i18next";
import Language from "./Language";

function RightHeader({ headerOption, open }) {
    const [langaugeButton, setLanguageButton] = useState(true);

    var x = window.matchMedia("(max-width: 768px)");

    function visability(x) {
        if (x.matches) {
            setLanguageButton(true);
        } else {
            setLanguageButton(false);
        }
    }

    useEffect(() => {
        visability(x);
        x.addEventListener("change", () => {
            visability(x)});
    })

    return (
        <div className={!open ? "header__nav" : "header__navOnClick"}>
            <Link className="header__link" to="/">
                <div className={headerOption[0]}>
                    <div className={`header__optionText${i18next.language}`}>{t("home")}</div>
                </div>
            </Link>
            <Link className="header__link" to="/Sheet Music">
                <div className={headerOption[1]}>
                    <div className={`header__optionText${i18next.language}`}>{t("sheet_music")}</div>
                </div>
            </Link>
            {/* <Link className="header__link" to="/">
                <div className={headerOption[2]}>
                    <div className={`header__optionText${i18next.language}`}>{t("requests")}</div>
                </div>
            </Link>
            <Link className="header__link" to="/">
                <div className={headerOption[3]}>
                    <div className={`header__optionText${i18next.language}`}>{t("beat_saber")}</div>
                </div>
            </Link> */}
            <Link className="header__link" to="/Contact">
                <div className={headerOption[4]}>
                    <div className={`header__optionText${i18next.language}`}>{t("contact")}</div>
                </div>
            </Link>
            <div className="header__invisibleOnDesktop">
                <a className="header__link" href="https://www.buymeacoffee.com/PiAnime">
                    <div className={headerOption[5]}>
                        <div className={`header__optionText${i18next.language}`}>{t("donate")}</div>
                    </div>
                </a>
            </div>
            {langaugeButton && <Language />}
        </div>
    );
}

export default RightHeader;
