import React, { useState, useEffect } from "react";
import * as Cookies from "../cookies/Cookies";
import { useAuth } from "../AuthContext";

const Notification = () => {
    const [customizeMode, setCustomizeMode] = useState(false);
    const [cookiePreferences, setCookiePreferences] = useState({
        essential: true,
        functional: true,
        advertising: true
    });

    const { setCookieAgreementValue } = useAuth();

    useEffect(() => {
        const savedPreferences = Cookies.getCookiePreferences();
        if (savedPreferences) {
            setCookiePreferences(JSON.parse(savedPreferences));
        }
    }, []);

    const handleCustomizeClick = () => {
        setCustomizeMode(true);
    };

    const handleAgreeClick = () => {
        Cookies.saveCookiePreferences(JSON.stringify(cookiePreferences));
        setCookieAgreementValue(true);
    };

    const handleSavePreferencesClick = () => {
        Cookies.saveCookiePreferences(JSON.stringify(cookiePreferences));
        setCustomizeMode(false);
    };

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setCookiePreferences((prevPreferences) => ({
            ...prevPreferences,
            [id]: checked,
        }));
    };

    return (
        <div className={"notification"}>
            <div className={`fixed-bottom notification-container ${customizeMode ? "customize-mode" : ""}`}>
                <div className={"container-fluid"}>
                    <div className={"row align-items-center"}>
                        <div className={"col-12 col-md-6"}>
                            <div className={"container"}>
                                {!customizeMode ? (
                                    <p>
                                        We use cookies to improve your browsing experience on our website.
                                        Cookies help us to remember your preferences and to personalize your
                                        experience by showing you relevant content and ads. We also use cookies
                                        to analyze website traffic and to understand how our visitors interact
                                        with our site, so we can make improvements and provide a better service to you.
                                        By continuing to use our website, you are agreeing to our use of cookies.
                                        If you wish to disable cookies, you can do so in your browser settings, but
                                        please note that this may affect the functionality of our website.
                                        <a
                                            href={"/files/policy/privacyPolicy.html"}
                                            target={"_blank"}
                                            rel={"noreferrer"}
                                            className={"m-1"}>
                                            Learn more
                                        </a>
                                    </p>
                                ) : (
                                    <>
                                        <h5 className={"notification-heading"}>Customize Your Cookie Preferences</h5>
                                        <p>
                                            Here you can adjust your cookie preferences. Select the types of cookies you want to disable.
                                        </p>
                                        <form className={"customize-form"}>
                                            <div className={"form-check"}>
                                                <input
                                                    type={"checkbox"}
                                                    className={"form-check-input"}
                                                    id={"essential"}
                                                    checked={cookiePreferences.essential}
                                                    disabled={true}/>
                                                <label className={"form-check-label"} htmlFor={"essential"}>
                                                    Essential Cookies
                                                </label>
                                            </div>
                                            <div className={"form-check"}>
                                                <input
                                                    type={"checkbox"}
                                                    className={"form-check-input"}
                                                    id={"functional"}
                                                    checked={cookiePreferences.functional}
                                                    onChange={handleCheckboxChange}/>
                                                <label className={"form-check-label"} htmlFor={"functional"}>
                                                    Functional Cookies
                                                </label>
                                            </div>
                                            <div className={"form-check"}>
                                                <input
                                                    type={"checkbox"}
                                                    className={"form-check-input"}
                                                    id={"advertising"}
                                                    checked={cookiePreferences.advertising}
                                                    onChange={handleCheckboxChange}/>
                                                <label className={"form-check-label"} htmlFor={"advertising"}>
                                                    Advertising Cookies
                                                </label>
                                            </div>
                                            <button
                                                type={"button"}
                                                className={"button mt-1"}
                                                onClick={handleSavePreferencesClick}>
                                                Save Preferences
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={"col-12 col-md-4 d-flex justify-content-end"}>
                            <div className={"button-group"}>
                                {!customizeMode ? (
                                    <>
                                        <button
                                            type={"button"}
                                            className={"button mt-1"}
                                            onClick={handleAgreeClick}>
                                            Agree
                                        </button>
                                        <button
                                            type={"button"}
                                            className={"button mt-1"}
                                            onClick={handleCustomizeClick}>
                                            Customize
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type={"button"}
                                        className={"button mt-1"}
                                        onClick={() => setCustomizeMode(false)}>
                                        Back
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;