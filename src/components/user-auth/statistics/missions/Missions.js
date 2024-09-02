import { useAuth } from "../../../auth/AuthContext";
import {Link, useParams} from "react-router-dom";
import Page404 from "../../../pages/404";
import React, { useState, useEffect } from "react";
import * as MissionsHandler from "./MissionsHandler";
import * as Cookies from "../../../auth/cookies/Cookies"

const Missions = () => {

    const [missionsStatistics, setMissionsStatistics] = useState([]);
    const [selectedMission, setSelectedMission] = useState(null);
    const [loading, setLoading] = useState(true);

    const { userData } = useAuth();
    const { username } = useParams();

    useEffect(() => {
        MissionsHandler.getMissionsStatistics(Cookies.getToken()).then(result => {
            if (result.success) {
                setMissionsStatistics(result.data === undefined ? [] : result.data);

                if (result.data !== undefined && result.data.length > 0) {
                    setSelectedMission(result.data[0]);
                    setLoading(false);
                }
                return;
            }
            setMissionsStatistics([]);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return null;
    }

    if (userData.username !== username) {
        return <Page404 />;
    }

    const handleRowClick = (weapon) => {
        setSelectedMission(weapon);
    };

    const getRowClassName = (mission) => {
        if (mission.idUser === null) {
            return "table-active grayscale-filter";
        }
        return selectedMission && selectedMission.id === mission.id ? "table-active" : "";
    };

    return (
        <div className={"statistics container mt-5"}>
            <div className={"row mt-5"}>
                <div className={"col-lg-8 col-12 order-lg-1 order-2"}>
                    <div className={"table-responsive"}>
                        <table className={"table table-bordered table-light table-hover"}>
                            <thead className={"thead-dark"}>
                            <tr>
                                <th className={"text-center"}>#</th>
                                <th className={"text-center"}>Mission</th>
                                <th className={"text-center"}>Best score</th>
                            </tr>
                            </thead>
                            <tbody>
                            {missionsStatistics.map((mission, index) => (
                                <tr
                                    key={mission.id}
                                    onClick={() => handleRowClick(mission)}
                                    className={`${getRowClassName(mission)} pointer`}>
                                    <td className={"text-center"}>{index + 1}</td>
                                    <td className={"text-center"}>
                                        <img
                                            src={`${process.env.REACT_APP_MISSION_IMAGES}${mission.image}`}
                                            alt={mission.name}
                                            className={"img-fluid mission-image mb-2"}
                                        />
                                        <p className={"m-0 p-0"}>{mission.name}</p>
                                    </td>
                                    <td className={"text-center align-middle"}>
                                        <div className={"d-flex flex-column align-items-center center-vertically"}>
                                            <span>{mission.score}</span>
                                            <span className={"text-muted"}>{mission.usedTime}</span>
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
                        {selectedMission ? (
                            <div className={"card-body"}>
                                <div className={"row"}>
                                    <div className={"d-flex justify-content-between"}>
                                        <h5 className={"card-title mt-2"}>
                                            {selectedMission.idUser !== null && selectedMission.playedCount !== 0 ?
                                                <Link to={`/${username}/missions/${selectedMission.name}`} className={"mission-link"}>
                                                    {selectedMission.name}
                                                </Link>
                                                : selectedMission.name}
                                        </h5>
                                    </div>
                                    <div className={"col-lg-12 col-sm-12 text-center mb-2"}>
                                        <img
                                            src={`${process.env.REACT_APP_MISSION_IMAGES}${selectedMission.image}`}
                                            className={"img-fluid weapon-selected"}
                                            alt={selectedMission.name}
                                        />
                                    </div>
                                    <hr/>
                                    <div className={"col-lg-12 col-sm-4"}>
                                        <h6 className={"card-title mt-3"}>Mission statistics</h6>
                                        <p className={"card-text m-0"}>Best score: {selectedMission.bestScore}</p>
                                        <p className={"card-text m-0"}>Best time: {selectedMission.bestUsedTime}</p>
                                    </div>
                                    <div className={"col-lg-12 col-sm-4"}>
                                        <h6 className={"card-title mt-3"}>Statistics</h6>
                                        <p className={"card-text m-0"}>Best score: {selectedMission.score}</p>
                                        <p className={"card-text m-0"}>Best time: {selectedMission.usedTime}</p>
                                        <p className={"card-text m-0"}>Played count: {selectedMission.playedCount}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={"text-center justify-content-center"}>Choose a mission for more
                                info</div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Missions;