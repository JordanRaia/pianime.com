import React, { useState } from "react";
import "./Header.css";
import RightHeader from "./RightHeader";

function Hamburger({ headerOption }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                open={open}
                onClick={() => setOpen(!open)}
                className={
                    !open ? "header__hamburger" : "header__hamburgerOnClick"
                }
            >
                <div />
                <div />
                <div />
            </div>
            <RightHeader headerOption={headerOption} open={open} />
        </>
    );
}

export default Hamburger;
