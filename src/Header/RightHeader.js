import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { t } from "i18next";

function RightHeader({ headerOption, open }) {
    return (
        <div className={!open ? "header__nav" : "header__navOnClick"}>
            <Link className="header__link" to="/">
                <div className={headerOption[0]}>
                    <div className="header__optionText">{t("home")}</div>
                </div>
            </Link>
            <Link className="header__link" to="/Sheet Music">
                <div className={headerOption[1]}>
                    <div className="header__optionText">{t("sheet_music")}</div>
                </div>
            </Link>
            {/* <Link className="header__link" to="/">
                <div className={headerOption[2]}>
                    <div className="header__optionText">{t("requests")}</div>
                </div>
            </Link>
            <Link className="header__link" to="/">
                <div className={headerOption[3]}>
                    <div className="header__optionText">{t("beat_saber")}</div>
                </div>
            </Link> */}
            <Link className="header__link" to="/Contact">
                <div className={headerOption[4]}>
                    <div className="header__optionText">{t("contact")}</div>
                </div>
            </Link>
            <div className="header__invisibleOnDesktop">
                <a className="header__link" href="https://www.buymeacoffee.com/PiAnime">
                    <div className={headerOption[5]}>
                        <div className="header__optionText">{t("donate")}</div>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default RightHeader;
