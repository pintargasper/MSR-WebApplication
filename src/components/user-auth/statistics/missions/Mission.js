import { useAuth } from "../../../auth/AuthContext";
import { useParams } from "react-router-dom";
import Page404 from "../../../pages/404";
import React, { useState, useEffect } from "react";
import * as MissionsHandler from "./MissionsHandler";
import * as Cookies from "../../../auth/cookies/Cookies"

const Mission = () => {

    const [missionStatistics, setMissionStatistics] = useState([]);
    const [selectedMission, setSelectedMission] = useState(null);
    const [missionName, setMissionName] = useState("");
    const [missionImage, setMissionImage] = useState("");
    const [loading, setLoading] = useState(true);

    const { userData } = useAuth();
    const { username, name } = useParams();

    useEffect(() => {
        if (name) {
            MissionsHandler.getMissionStatistics(name, Cookies.getToken()).then(result => {
                if (result.success) {
                    setMissionStatistics(result.data === undefined ? [] : result.data);

                    if (result.data !== undefined && result.data.length > 0) {
                        setMissionName(result.data[0].name);
                        setMissionImage(result.data[0].image);
                        setLoading(false);
                    }
                    return;
                }
                setMissionStatistics([]);
                setLoading(false);
            });
        }
    }, [name]);

    if (loading) {
        return null;
    }

    if (userData.username !== username && missionName !== name) {
        return <Page404 />;
    }

    const handleRowClick = (weapon) => {
        setSelectedMission(weapon);
    };

    const getRowClassName = (mission) => {
        return selectedMission && selectedMission.id === mission.id ? "table-active" : "";
    };

    return (
        <div className={"container mt-5"}>
            <div className={"row mt-5"}>
                <div className={"col-lg-8 col-12 order-lg-1 order-2"}>
                    <div className={"table-responsive"}>
                        <table className={"table table-bordered table-light table-hover"}>
                            <thead className={"thead-dark"}>
                            <tr>
                                <th className={"text-center"}>#</th>
                                <th className={"text-center"}>Score</th>
                                <th className={"text-center"}>Money</th>
                                <th className={"text-center"}>Used time</th>
                                <th className={"text-center"}>Played on</th>
                            </tr>
                            </thead>
                            <tbody>
                            {missionStatistics.map((mission, index) => (
                                <tr
                                    key={mission.id}
                                    onClick={() => handleRowClick(mission)}
                                    className={`${getRowClassName(mission)} pointer`}
                                >
                                    <td className={"text-center"}>{index + 1}</td>
                                    <td className={"text-center"}>{mission.score}</td>
                                    <td className={"text-center"}>{mission.money}€</td>
                                    <td className={"text-center"}>{mission.usedTime}</td>
                                    <td className={"text-center"}>{mission.playedOn}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <aside className={"col-lg-4 col-sm-12 order-lg-2 order-1 mb-sm-2"}>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <div className={"text-center"}>
                                <h5 className={"card-title mt-2"}>{name}</h5>
                                <img
                                    src={`${process.env.REACT_APP_MISSION_IMAGES}${missionImage}`}
                                    className={"img-fluid"}
                                    alt={missionName}
                                />
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Mission;