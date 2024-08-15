const Index = () => {

    return (
        <>
            <div className={"container mb-2"}>
                <section id={"about"} className={"d-flex align-items-center about mt-5"}>
                    <div className={"container"}>
                        <div className={"row justify-content-between gy-5"}>
                            <h1 className={"text-center p-3 p-md-4"}>Memo Stick Rescue</h1>
                            <div
                                className={"col-lg-7 order-1 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start"}>
                                <p>
                                    <video className={"img-fluid"} controls autoPlay={false} loop={true}>
                                        <source src={"/files/video/trailer-video.mp4"}
                                                type={"video/mp4"}/>
                                        <track src={"../captions/En.vtt"} kind={"captions"} srcLang={"en"}
                                               label={"english_captions"}/>
                                    </video>
                                </p>
                            </div>
                            <div className={"col-lg-5 order-2 order-lg-2 text-center text-lg-start"}>
                                <h3 className={"text-center"}>About</h3>
                                <p>
                                    Memo Stick Rescue provides a dramatic experience like no other. In Memo Stick Rescue,
                                    you
                                    can fight enemies while trying to make your way to the end of the current game map. Do
                                    more
                                    and be more by playing to your strengths and creating your path to victory. Immerse
                                    yourself
                                    in the glorious chaos of all-out fun and tactics only available in Memo Stick Rescue.
                                </p>
                                <div className={"text-center"}>
                                    <a href={"#download"}>
                                        <button type={"button"} value={"Download"} className={"button mb-3"}>Download
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id={"download"} className={"download"}>
                    <div className={"container"}>
                        <div className={"text-center mt-2 mb-3"}>
                            <h2 className={"pt-2"}>Download</h2>
                            <p>Memo Stick Rescue</p>
                        </div>
                        <div className={"row"}>
                            <div className={"col-xxl-4 mx-auto"}>
                                <div className={"requirements"}>
                                    <h3>System requirements</h3>
                                    <p><b>OS:</b> Windows 7</p>
                                    <p><b>Processor (AMD):</b> Athlon X2 2.2 GHz</p>
                                    <p><b>Processor (Intel):</b> Core 2 Duo 2.4 GHz</p>
                                    <p><b>Memory: </b> 512MB</p>
                                    <p><b>Hard Drive:</b> 100MB</p>
                                    <p><b>Graphics card (AMD):</b> AMD Radeon HD 3870</p>
                                    <p><b>Graphics card (NVIDIA):</b> Nvidia GeForce 8600</p>
                                    <p><b>Graphics memory:</b> 64MB</p>
                                </div>
                            </div>
                            <div className={"col-xxl-8 col-12 d-flex justify-content-center align-items-center files"}>
                                <div className={"row col-12"}>
                                    <div className={"col-md-4 mb-4"}>
                                        <div
                                            className={"member d-flex flex-column justify-content-center align-items-center"}>
                                            <img src={"/files/img/windows-icon.png"}
                                                 alt={"windows-icon"} className={"image"}/>
                                            <h4>Windows</h4>
                                            <p>EXE file</p>
                                            <div className={"text-center"}>
                                                <a href={"/"}>Download</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"col-md-4 mb-4"}>
                                        <div
                                            className={"member d-flex flex-column justify-content-center align-items-center"}>
                                            <img src={"files/img/linux-icon.png"}
                                                 alt={"linux-icon"} className={"image"}/>
                                            <h4>Linux</h4>
                                            <p>ZIP file</p>
                                            <div className={"text-center"}>
                                                <a href={"/"}>Download</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"col-md-4 mb-4"}>
                                        <div
                                            className={"member d-flex flex-column justify-content-center align-items-center"}>
                                            <img src={"files/img/android-icon.png"}
                                                 alt={"android-icon"} className={"image"}/>
                                            <h4>Android</h4>
                                            <p>APK file</p>
                                            <div className={"text-center"}>
                                                Coming Soon
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id={"github"} className={"github"}>
                    <div className={"container"}>
                        <div className={"text-center mt-2 mb-3"}>
                            <h2 className={"pt-2"}>GitHub</h2>
                            <p>Source code</p>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-lg-4 mb-4 p-4"}>
                            <div className={"member d-flex flex-column justify-content-center align-items-center"}>
                                <img src={"/files/img/github-icon.png"} alt={"github-icon"}
                                     className={"image"}/>
                                <h4>Video game</h4>
                                <i className={"description"}>This code gives us insight into the game itself, in which
                                    everything takes place. From the store where you can buy different skins, to the game
                                    itself, which you can play</i>
                                <div className={"text-center mt-4"}>
                                    <div className={"mt-3 pb-2"}>
                                        <a href={"https://github.com/Mister-3551/MemoStickRescue"} target={"_blank"}
                                           rel={"noreferrer"}>View code</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"col-lg-4 mb-4 p-4"}>
                            <div className={"member d-flex flex-column justify-content-center align-items-center"}>
                                <img src={"/files/img/github-icon.png"} alt={"github-icon"}
                                     className={"image"}/>
                                <h4>Web application</h4>
                                <i className={"description"}>This code provides insight into the development process of a
                                    web application designed to view your stats and stats from any player</i>
                                <div className={"text-center mt-4"}>
                                    <div className={"mt-3 pb-2"}>
                                        <a href={"https://github.com/Mister-3551/MSR-WebApplication"} target={"_blank"}
                                           rel={"noreferrer"}>View code</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"col-lg-4 mb-4 p-4"}>
                            <div className={"member d-flex flex-column justify-content-center align-items-center"}>
                                <img src={"/files/img/github-icon.png"} alt={"github-icon"}
                                     className={"image"}/>
                                <h4>Server application</h4>
                                <i className={"description"}>This code gives us insight into the very background and logic
                                    of the so-called backend, which is intended for data calculation</i>
                                <div className={"text-center mt-4"}>
                                    <div className={"mt-3 pb-2"}>
                                        <a href={"https://github.com/Mister-3551/MSR-Server"} target={"_blank"}
                                           rel={"noreferrer"}>View code</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Index