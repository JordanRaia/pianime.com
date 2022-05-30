import React, { useEffect, useRef, useState } from "react";
import i18next from "i18next";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LanguageIcon from "@mui/icons-material/Language";
import "./Language.css";
import "flag-icon-css/css/flag-icons.min.css";

const languages = [
    {
        code: "en",
        name: "English",
        country_code: "gb",
    },
    {
        code: "jp",
        name: "日本語",
        country_code: "jp",
    },
];

function Language() {
    const [isActive, setIsActive] = useState(false);
    const dropdownRef = useRef(null);

    const handleClick = () => setIsActive(!isActive);

    useEffect(() => {
        const pageClickEvent = (e) => {
            // If isActive and clicked outside of the dropdown then set isactive to false
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setIsActive(!isActive);
            }
        }

        if(isActive) {
            window.addEventListener("click", pageClickEvent);
        }

        return () => {
            window.removeEventListener("click", pageClickEvent);
        }

    }, [isActive]) 

    return (
        <div ref={dropdownRef} className="language__dropdown">
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap"
            />
            <div className={isActive && "language__dropdownHoverBackground"}>
                <button
                    id="hover"
                    onClick={handleClick}
                    className="language__dropdownHover"
                >
                    <LanguageIcon />
                    <ArrowDropDownIcon />
                </button>
            </div>
            <ul
                id="dropdown"
                className={
                    isActive
                        ? "language__dropdownMenu"
                        : "language__dropdownMenuInActive"
                }
            >
                {languages.map(({ code, name, country_code }) => (
                    <a
                        href="#"
                        className={
                            code === i18next.language
                                ? "language__noStyleDisabled"
                                : "language__noStyle"
                        }
                    >
                        <li
                            onClick={() => i18next.changeLanguage(code)}
                            key={country_code}
                            className="language__language"
                        >
                            <button
                                className="language__button"
                                disabled={code === i18next.language}
                            >
                                <span
                                    className={`language__flag flag-icon flag-icon-${country_code}`}
                                    style={{
                                        opacity:
                                            code === i18next.language ? 0.5 : 1,
                                    }}
                                />
                                <div
                                    className={`language__languageText${code}`}
                                >
                                    {name}
                                </div>
                            </button>
                        </li>
                    </a>
                ))}
            </ul>
        </div>
    );
}

export default Language;
