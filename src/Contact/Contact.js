import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import EmailIcon from "@mui/icons-material/Email";
import { t } from "i18next";

function Contact() {
    const [message, setMessage] = useState("");

    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message === "") {
            window.alert("Missing Message");
        } else {
            sendEmail(e);
        }
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_dz9fggs",
                "template_mnwrmzl",
                form.current,
                "X0OtLEJhhRJ4DRXew"
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
        window.alert("Message Sent!");
        e.target.reset();
    };

    return (
        <div className="contact">
            <h1 className="contact__title">{t("contact")}</h1>
            <div className="contact__email">
                <div className="contact__icon">
                    <EmailIcon />
                </div>
                <div className="contact__emailAddress">pianimeyt@gmail.com</div>
            </div>
            <div className="contact__form">
                <form ref={form} onSubmit={handleSubmit}>
                    <div className="contact__formFlexBox">
                        <div className="contact__nameFlexBox">
                            <div className="contact__inputField">
                                <input
                                    className="contact__inputText"
                                    type="text"
                                    placeholder={t("name")}
                                    name="name"
                                />
                            </div>
                            <div className="contact__inputField">
                                <input
                                    className="contact__inputText"
                                    type="text"
                                    name="email"
                                    placeholder={t("email")}
                                />
                            </div>
                        </div>
                        <div className="contact__inputField">
                            <input
                                className="contact__inputText"
                                type="text"
                                placeholder={t("subject")}
                                name="subject"
                            />
                        </div>
                        <div className="contact__inputField">
                            <textarea
                                onChange={(e) => setMessage(e.target.value)}
                                className="contact__textArea"
                                name="message"
                                placeholder={t("message")}
                                id=""
                                cols="30"
                                rows="8"
                            ></textarea>
                        </div>
                        <div className="contact__submitDiv">
                            <input
                                className="contact__submit"
                                type="submit"
                                value={t("send")}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;
