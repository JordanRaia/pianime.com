import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="footer__title">PiAnime</div>
            <div className="footer__subtitle">Anime Piano Arrangements</div>
            <p class="footer__copyright">
                Copyright &copy;{new Date().getFullYear()} PiAnime All Rights Reserved
            </p>
        </div>
    );
}

export default Footer;
