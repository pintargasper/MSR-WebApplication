import { useAuth } from "../../auth/AuthContext";
import { useParams } from "react-router-dom";
import Page404 from "../../pages/404";
import React, { useEffect, useState } from "react";
import CircleChart from "../../chart/CircleChart";
import HalfCircleGraph from "../../chart/HalfCircleGraph";
import * as HomeHandler from "./HomeHandler";

const Home = () => {

    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);

    const { userData } = useAuth();
    const { username } = useParams();

    useEffect(() => {
        HomeHandler.getStatistics(setStatistics, setLoading);
    }, []);

    if (loading) {
        return null;
    }

    if (userData.username !== username) {
        return <Page404 />;
    }

    return (
        <div className={"home container mt-5"}>
            <div className={"d-flex align-items-center mt-5"}>
                <div>
                    <img
                        id={"formPhoto"}
                        src={process.env.REACT_APP_PROFILE_IMAGES + (userData.image || "basic-image.jpg")}
                        alt={"Profile"}
                        className={"img-thumbnail img-fluid"}
                        height={100}
                        width={100}
                    />
                </div>
                <div className={"ms-3"}>
                    <div className={"h2 mb-0 text-uppercase"}>{userData.username}</div>
                    <div className={"h5 mt-0"}>Level {statistics.level}</div>
                </div>
            </div>
            <div>
                <div className={"overview row text-center mt-2"}>
                    <div className={"col-sm-12 col-md-4 mb-4"}>
                        <div className={"overview-box border rounded d-flex flex-column"}>
                            <div className={"box-header text-white p-2"}>Win / Loss</div>
                            <div
                                className={"box-body p-3 d-flex align-items-center justify-content-center flex-grow-1"}>
                                <div className={"w-100 d-flex align-items-center justify-content-center"}>
                                    <CircleChart value={statistics.winPercentage ?? 0} maxValue={100}/>
                                </div>
                            </div>
                            <div className={"box-footer p-2"}>
                                <div className={"footer-cell"}>
                                    <div className={"box-stats-header"}>Wins</div>
                                    <div className={"box-stats-value fw-bold"}>{statistics.wins ?? 0}</div>
                                </div>
                                <div className={"footer-cell"}>
                                    <div className={"box-stats-header"}>Losses</div>
                                    <div className={"box-stats-value fw-bold"}>{statistics.losses ?? 0}</div>
                                </div>
                                <div className={"footer-cell"}>
                                    <div className={"box-stats-header"}>Score</div>
                                    <div className={"box-stats-value fw-bold"}>{statistics.score ?? 0}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-12 col-md-4 mb-4"}>
                        <div className={"overview-box border rounded d-flex flex-column"}>
                            <div className={"box-header text-white p-2"}>Money per second</div>
                            <div
                                className={"box-body p-3 d-flex align-items-center justify-content-center flex-grow-1"}>
                                <div className={"w-100 d-flex align-items-center justify-content-center"}>
                                    <div className={"h1 m-0"}>145€</div>
                                </div>
                            </div>
                            <div className={"box-footer p-2"}>
                                <div className={"footer-cell"}>
                                    <div className={"box-stats-header"}>Money</div>
                                    <div className={"box-stats-value fw-bold"}>{statistics.money ?? 0}€</div>
                                </div>
                                <div className={"footer-cell"}>
                                    <div className={"box-stats-header"}>Time played</div>
                                    <div className={"box-stats-value fw-bold"}>{statistics.timePlayed ?? "0s"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-12 col-md-4 mb-4"}>
                        <div className={"overview-box border rounded d-flex flex-column"}>
                            <div className={"box-header text-white p-2"}>K/D</div>
                            <div
                                className={"box-body p-3 d-flex align-items-center justify-content-center flex-grow-1"}>
                                <div className={"w-100 d-flex align-items-center justify-content-center"}>
                                    <HalfCircleGraph value={statistics.killDeathRatio ?? 0} maxValue={10}/>
                                </div>
                            </div>
                            <div className={"box-footer p-2"}>
                                <div className={"footer-cell"}>
                                    <div className={"box-stats-header"}>Kills</div>
                                    <div className={"box-stats-value fw-bold"}>{statistics.kills}</div>
                                </div>
                                <div className={"footer-cell"}>
                                    <div className={"box-stats-header"}>Deaths</div>
                                    <div className={"box-stats-value fw-bold"}>{statistics.deaths}</div>
                                </div>
                                <div className={"footer-cell"}>
                                    <div className={"box-stats-header"}>Accuracy</div>
                                    <div className={"box-stats-value fw-bold"}>11.57%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-12 col-md-4 mb-4"}>
                        <div className={"overview-box border rounded d-flex flex-column"}>
                            <div className={"box-header text-white p-2"}>Top weapon</div>
                            <div className={"box-body p-3 d-flex align-items-center justify-content-center"}>
                                <div className={"w-100 d-flex align-items-center justify-content-center"}>
                                    <img
                                        src={process.env.REACT_APP_WEAPON_IMAGES + statistics.weaponImage}
                                        alt={statistics.weaponName}
                                        className={"img-fluid"}
                                    />
                                </div>
                            </div>
                            <div className={"box-footer p-2"}>
                                <div className={"footer-cell"}>
                                    <div className={"box-stats-header"}>Name</div>
                                    <div className={"box-stats-value fw-bold"}>{statistics.weaponName}</div>
                                </div>
                                <div className={"footer-cell"}>
                                    <div className={"box-stats-header"}>Kills</div>
                                    <div className={"box-stats-value fw-bold"}>{statistics.weaponKills}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-12 col-md-4 mb-4"}>
                        <div className={"overview-box border rounded d-flex flex-column"}>
                            <div className={"box-header text-white p-2"}>Top mission</div>
                            <div className={"box-body p-3 d-flex align-items-center justify-content-center"}>
                                <div className={"w-100 d-flex align-items-center justify-content-center"}>
                                    <img
                                        src={process.env.REACT_APP_WEAPON_IMAGES + statistics.weaponImage}
                                        alt={statistics.weaponName}
                                        className={"img-fluid"}
                                    />
                                </div>
                            </div>
                            <div className={"box-footer p-2"}>
                                <div className={"footer-cell"}>
                                    <div className={"box-stats-header"}>Name</div>
                                    <div className={"box-stats-value fw-bold"}>Training</div>
                                </div>
                                <div className={"footer-cell"}>
                                    <div className={"box-stats-header"}>Score</div>
                                    <div className={"box-stats-value fw-bold"}>1840</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;