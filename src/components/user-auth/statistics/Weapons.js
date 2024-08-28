import { useAuth } from "../../auth/AuthContext";
import { useParams } from "react-router-dom";
import Page404 from "../../pages/404";
import { useState, useEffect } from "react";
import * as StatisticsHandler from "./WeaponsHandler";

const Weapons = () => {
    const [weaponsStatistics, setWeaponsStatistics] = useState([]);
    const [selectedWeapon, setSelectedWeapon] = useState(null);
    const { userData } = useAuth();
    const { username } = useParams();

    useEffect(() => {
        StatisticsHandler.getWeaponStatistics((data) => {
            setWeaponsStatistics(data);
            if (data.length > 0) {
                setSelectedWeapon(data[0]);
            }
        });
    }, []);

    const handleRowClick = (weapon) => {
        setSelectedWeapon(weapon);
    };

    const getRowClassName = (weapon) => {
        if (weapon.idUser === null) {
            return "table-active grayscale-filter";
        }
        return selectedWeapon && selectedWeapon.id === weapon.id ? "table-active" : "";
    };

    if (userData.username === username) {
        return (
            <div className={"statistics container mt-5"}>
                <div className={"row mt-5"}>
                    <div className={"col-lg-8 col-12 order-lg-1 order-2"}>
                        <div className={"table-responsive"}>
                            <table className={"table table-bordered table-light table-hover"}>
                                <thead className={"thead-dark"}>
                                <tr>
                                    <th className={"text-center"}>#</th>
                                    <th className={"text-center"}>Weapon</th>
                                    <th className={"text-center"}>Stars</th>
                                    <th className={"text-center"}>Accuracy</th>
                                    <th className={"text-center"}>Kills</th>
                                </tr>
                                </thead>
                                <tbody>
                                {weaponsStatistics.map((weapon, index) => (
                                    <tr
                                        key={weapon.id}
                                        onClick={() => handleRowClick(weapon)}
                                        className={`${getRowClassName(weapon)} pointer`}>
                                        <td className={"text-center"}>{index + 1}</td>
                                        <td className={"text-center"}>
                                            <img
                                                src={`${process.env.REACT_APP_WEAPON_IMAGES}${weapon.image}`}
                                                alt={weapon.name}
                                                className={"img-fluid weapon-image mb-2"}
                                            />
                                            <p className={"m-0 p-0"}>{weapon.name}</p>
                                        </td>
                                        <td className={"text-center align-middle"}>
                                            <div className={"d-flex flex-column align-items-center"}>
                                                <img
                                                    src={`${process.env.REACT_APP_STAR_IMAGES}star.png`}
                                                    alt={"Star"}
                                                    className={"img-fluid mb-2 star-image"}
                                                />
                                                <span>{weapon.stars}</span>
                                            </div>
                                        </td>
                                        <td className={"text-center align-middle"}>
                                            <div className={"d-flex flex-column align-items-center"}>
                                                <span>{weapon.accuracy}%</span>
                                            </div>
                                        </td>
                                        <td className={"text-center align-middle"}>
                                            <div className={"d-flex flex-column align-items-center center-vertically"}>
                                                <span>{weapon.kills}</span>
                                                <span className={"text-muted"}>{weapon.usedTime}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <aside className={"col-lg-4 col-sm-12 order-lg-2 order-1 mb-sm-2 aside-fixed"}>
                        <div className={"card"}>
                            {selectedWeapon ? (
                                <div className={"card-body"}>
                                    <div className={"row"}>
                                        <h5 className={"card-title text-center mt-2"}>{selectedWeapon.name}</h5>
                                        <div className={"col-lg-12 col-sm-4 text-center"}>
                                            <img
                                                src={`${process.env.REACT_APP_WEAPON_IMAGES}${selectedWeapon.image}`}
                                                className={"img-fluid weapon-selected"}
                                                alt={selectedWeapon.name}
                                            />
                                        </div>
                                        <div className={"col-lg-12 col-sm-4"}>
                                            <h6 className={"card-title mt-3"}>Weapon statistics</h6>
                                            <p className={"card-text m-0"}>Damage: {selectedWeapon.damage}%</p>
                                            <p className={"card-text m-0"}>Accuracy: {selectedWeapon.weaponAccuracy}%</p>
                                            <p className={"card-text m-0"}>Range: {selectedWeapon.bulletRange}</p>
                                            <p className={"card-text m-0"}>Rate of fire: {selectedWeapon.fireRate}</p>
                                        </div>
                                        <div className={"col-lg-12 col-sm-4"}>
                                            <h6 className={"card-title mt-3"}>Statistics</h6>
                                            <p className={"card-text m-0"}>Kills: {selectedWeapon.kills}</p>
                                            <p className={"card-text m-0"}>Accuracy: {selectedWeapon.accuracy}%</p>
                                            <p className={"card-text m-0"}>Shots fired: {selectedWeapon.shotsFired}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={"text-center justify-content-center"}>Choose a weapon for more
                                    info</div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        );
    }
    return <Page404/>;
};

export default Weapons;