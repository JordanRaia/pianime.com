import React, { useState } from "react";
import { getDownloadURL } from "firebase/storage";
import "./RenderPdf.css";

function RenderPdf({ pdfRef }) {
    const [pageUrl, setPageUrl] = useState("");

    getDownloadURL(pdfRef)
        .then((url) => {
            setPageUrl(url);
        })
        .catch((error) => {
            console.log("Error in getDownloadURL:", error);
        });

    return (
        <div className="pdf">
            <iframe className="pdf__object" src={pageUrl} frameBorder="0" title="sheet music pdf" type="application/pdf">
            </iframe>
        </div>
    );
}

export default RenderPdf;