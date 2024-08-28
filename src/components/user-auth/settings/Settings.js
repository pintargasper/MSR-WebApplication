import React, { useEffect, useRef, useState } from "react";
import { FaExclamationTriangle, FaShieldAlt, FaUserAlt } from "react-icons/fa";
import { useAuth } from "../../auth/AuthContext";
import { Popup } from "../../popup/Popup";
import * as Countries from "../../no-auth/Countries"
import * as SettingsHandler from "./SettingsHandler";
import {useNavigate, useParams} from "react-router-dom";
import Page404 from "../../pages/404";

const Settings = () => {
    const [fullName, setFullName] = useState("");
    const [usernameProfile, setUsernameProfile] = useState("");
    const [oldUsername, setOldUsername] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [country, setCountry] = useState("");
    const [temporaryImage, setTemporaryImage] = useState(null);
    const [temporaryImagePreview, setTemporaryImagePreview] = useState(null);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [deleteAccount, setDeleteAccount] = useState("");
    const [countriesList, setCountriesList] = useState([]);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("IMAGE");
    const [loading, setLoading] = useState(true);

    const profileFileInputRef = useRef(null);

    const {userRole, userData, accountDelete, profileImage, setProfileImage} = useAuth();
    const { username} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        Countries.countries(setCountriesList);
        if (userData) {
            setFullName(userData.fullName || "");
            setUsernameProfile(userData.username || "");
            setOldUsername(userData.username || "");
            setEmailAddress(userData.emailAddress || "");
            setBirthDate(userData.birthdate || "");
            setCountry(userData.country || "");
        }
        setLoading(false);
    }, [userData]);

    const handleProfilePhotoChange = (event) => {
        const file = event.target.files[0];
        setTemporaryImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTemporaryImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileUpdate = (event) => {
        SettingsHandler.updateProfile(
            event,
            fullName,
            usernameProfile,
            emailAddress,
            birthDate,
            country,
            setProfileImage,
            temporaryImage,
            setTemporaryImage,
            setTemporaryImagePreview,
            setError,
            setModalOpen,
            setModalType
        ).then(result => {
            setOldUsername(result);
        });
    };

    const handlePasswordChange = (event) => {
        SettingsHandler.passwordChange(
            event,
            password,
            newPassword,
            confirmPassword,
            setError,
            setModalOpen,
            setModalType
        ).then(result => null);
    };

    const handleProfileDelete = (event) => {
        SettingsHandler.deleteAccount(
            event,
            usernameProfile,
            deleteAccount,
            navigate,
            setError,
            setModalOpen,
            setModalType,
            accountDelete
        ).then(result => null);
    };

    if (loading) {
        return null;
    }

    if (userData.username === username || userRole === "ROLE_ADMIN") {
        return (
            <>
                <div id={"settings"} className={"container settings mt-5 d-flex justify-content-center"}>
                    <div className={"col-lg-6 col-md-9 col-sm-12 col-12"}>
                        <h1 className={"text-center my-4"}>Settings</h1>
                        <form className={"input-form"}>
                            <div className={"mb-4"}>
                                <div className={"d-flex align-items-center justify-content-center"}>
                                    <h5 className={"text-center mb-0 me-2"}>Personal information</h5>
                                    <FaUserAlt size={24}/>
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"formName"} className={"form-label"}>Name</label>
                                    <input
                                        id={"formName"}
                                        type={"text"}
                                        className={"form-control input"}
                                        placeholder={"Enter your fullName"}
                                        value={fullName || ""}
                                        onChange={(event) => setFullName(event.target.value)}
                                    />
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"formUsername"} className={"form-label"}>Username</label>
                                    <input
                                        id={"formUsername"}
                                        type={"text"}
                                        className={"form-control input"}
                                        placeholder={"Enter your usernameProfile"}
                                        value={usernameProfile || ""}
                                        autoComplete={"username"}
                                        onChange={(event) => setUsernameProfile(event.target.value)}
                                    />
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"formEmail"} className={"form-label"}>Email address</label>
                                    <input
                                        id={"formEmail"}
                                        type={"email"}
                                        className={"form-control input"}
                                        placeholder={"Enter your emailAddress address"}
                                        value={emailAddress || ""}
                                        onChange={(event) => setEmailAddress(event.target.value)}
                                    />
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"formBirthDate"} className={"form-label"}>Birth date</label>
                                    <input
                                        id={"formBirthDate"}
                                        type={"date"}
                                        className={"form-control input"}
                                        value={birthDate || ""}
                                        onChange={(event) => setBirthDate(event.target.value)}
                                    />
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"formCountry"} className={"form-label"}>Country</label>
                                    <select id={"formCountry"} className={"input form-control mt-1"} name={"country"}
                                            value={country}
                                            autoComplete={"country"}
                                            onChange={(event) => setCountry(event.target.value)}>
                                        {countriesList.map((countryItem, index) => (
                                            <option key={index} value={countryItem.name}>{countryItem.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"formPhotoInput"} className={"form-label d-block"}>Image</label>
                                    <div className={"d-flex align-items-end"}>
                                        <input
                                            type={"file"}
                                            id={"formPhotoInput"}
                                            name={"formPhotoInput"}
                                            className={"d-none"}
                                            onChange={(event) => handleProfilePhotoChange(event)}
                                        />
                                        <img
                                            id={"formPhoto"}
                                            src={process.env.REACT_APP_PROFILE_IMAGES + (profileImage || "basic-image.jpg")}
                                            alt={"Profile"}
                                            name={"formPhoto"}
                                            className={"img-thumbnail image"}
                                            height={100}
                                            width={200}
                                        />
                                        <div className={"ms-auto"}>
                                            <button type={"button"} className={"button"} onClick={() => {
                                                setModalOpen(true);
                                                setModalType("IMAGE")
                                            }}>
                                                Change
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={"text-center"}>
                                    <button type={"button"} className={"button"}
                                            onClick={(event) => handleProfileUpdate(event)}>
                                        Update profile
                                    </button>
                                </div>
                            </div>

                            <div className={"mt-5 mb-4"}>
                                <div className={"d-flex align-items-center justify-content-center"}>
                                    <h5 className={"text-center mb-0 me-2"}>Security</h5>
                                    <FaShieldAlt size={24}/>
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"formPassword"} className={"form-label"}>Current Password</label>
                                    <input
                                        id={"formPassword"}
                                        type={"password"}
                                        className={"form-control input"}
                                        placeholder={"Enter your current password"}
                                        value={password || ""}
                                        autoComplete={"current-password"}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"formNewPassword"} className={"form-label"}>New Password</label>
                                    <input
                                        id={"formNewPassword"}
                                        type={"password"}
                                        className={"form-control input"}
                                        placeholder={"Enter your new password"}
                                        value={newPassword || ""}
                                        autoComplete={"new-password"}
                                        onChange={(event) => setNewPassword(event.target.value)}
                                    />
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"formConfirmPassword"} className={"form-label"}>Confirm
                                        Password</label>
                                    <input
                                        id={"formConfirmPassword"}
                                        type={"password"}
                                        className={"form-control input"}
                                        placeholder={"Confirm your new password"}
                                        value={confirmPassword || ""}
                                        autoComplete={"confirm-new-password"}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                    />
                                </div>
                                <div className={"text-center"}>
                                    <button type={"button"} className={"button"}
                                            onClick={(event) => handlePasswordChange(event)}>
                                        Change password
                                    </button>
                                </div>
                            </div>

                            <div className={"mt-5 mb-4 text-danger"}>
                                <div className={"d-flex align-items-center justify-content-center"}>
                                    <h5 className={"text-center mb-0 me-2"}>Danger zone</h5>
                                    <FaExclamationTriangle size={24}/>
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"formDeleteAccount"} className={"form-label"}>Delete account</label>
                                    <div className={"d-flex align-items-center"}>
                                        <input
                                            id={"formDeleteAccount"}
                                            type={"text"}
                                            className={"form-control input flex-grow-1"}
                                            placeholder={`Type: ${oldUsername}/delete`}
                                            value={deleteAccount}
                                            onChange={(event) => setDeleteAccount(event.target.value)}
                                        />
                                        <button type={"button"} className={"button ms-2"}
                                                onClick={(event) => handleProfileDelete(event)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <Popup trigger={modalOpen} setTrigger={setModalOpen}>
                    <div className={"popup form settings"}>
                        <div className={"text-center"}>
                            {modalType !== "IMAGE" ? (
                                <>
                                    {
                                        modalType === "PASSWORD" ? (
                                            <>
                                                <h3>Password</h3>
                                                <p>{error}</p>
                                            </>
                                        ) : (
                                            <>
                                                <h3>Profile</h3>
                                                <p>{error}</p>
                                            </>
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    <h3>Change image</h3>
                                    <p>Max file size: 1MB</p>
                                    <label
                                        htmlFor={"profile-photo-upload"}
                                        className={`btn btn-light input-label ${temporaryImage === null ? "" : (temporaryImage.size >= 1048576 ? "text-danger" : "text-success")}`}>
                                        {temporaryImage === null
                                            ? "Upload file"
                                            : `Uploaded file: ${temporaryImage.name} (${(temporaryImage.size / (1024 * 1024)).toFixed(2)} MB)`}
                                    </label>
                                    <input
                                        id={"profile-photo-upload"}
                                        type={"file"}
                                        ref={profileFileInputRef}
                                        className={"form-control-file w-100 input visually-hidden"}
                                        onChange={handleProfilePhotoChange}
                                        accept={".jpg, .jpeg, .png, .gif"}
                                    />
                                    {temporaryImagePreview && (
                                        <img
                                            src={temporaryImagePreview}
                                            alt={"Home Preview"}
                                            className={"image-preview"}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                        <div className={"text-right"}>
                            <div className={"input-form"}>
                                {temporaryImage && modalType === "IMAGE" ?
                                    <button type={"button"} className={"button mt-2 mb-2"} onClick={() => {
                                        setTemporaryImagePreview(null);
                                        setTemporaryImage(null);
                                        if (profileFileInputRef.current) {
                                            profileFileInputRef.current.value = null;
                                        }
                                    }}>
                                        Remove
                                    </button> : null
                                }
                                <button type={"button"} className={"button mt-2 mb-2"}
                                        onClick={() => setModalOpen(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </Popup>
            </>
        );
    }
    return <Page404/>;
}

export default Settings;