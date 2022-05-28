import { t } from "i18next";
import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="footer__title">{t("home_title")}</div>
            <div className="footer__subtitle">{t("home_subtitle")}</div>
            <p class="footer__copyright">
                {t("copyright")}&copy;{new Date().getFullYear()}{t("home_title")}{t("rights_reserved")}
            </p>
        </div>
    );
}

export default Footer;
