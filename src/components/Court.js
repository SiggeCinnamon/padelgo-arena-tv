import React, { useState, useEffect, useRef } from "react";
import StreamPlayer from "./StreamPlayer.js";
import Videojs from "video.js";
import axios from "axios";

function Court({ match }) {
    const debugLevel = true;
    const [court, setCourt] = useState([]);
    const [popular, setPopular] = useState([]);
    const [playerProp, setPlayerProp] = useState("");

    const playerRef = useRef(null);

    useEffect(() => {
        fetchCourt();
    }, []);

    function debugMessage(scope, msg) {
        if (debugLevel) {
            console.log(scope, msg);
        }
    }

    const fetchCourt = async () => {
        try {
            const clubResponse = await axios.get(
                `https://staging-courts.padelgo.tv/v2/courts/${match.params.courtExtId}`
            );
            const courtsResponse = await axios.get(
                `https://staging-courts.padelgo.tv/Courts/${await clubResponse.data
                    .clubId}`
            );

            setCourt(courtsResponse.data);
            debugMessage(
                "fetchCourt.courtsResponse.data:",
                await courtsResponse.data
            );
        } catch (e) {
            console.error("fetchCourt ERROR :", e);
        }
    };

    const fetchPopular = async (clubId, topN) => {
        try {
            const body = {
                clubId: clubId,
                stream: true,
                liveStream: true,
                highlight: true,
                video: true,
                page: 1,
                take: topN,
                sortOrder: 0,
            };

            const response = await axios.post(
                `https://staging-streams.padelgo.tv/Media/popular`,
                body
            );
            debugMessage("fetchPopular.response.data:", response.data);
            setPopular(response.data);
        } catch (e) {
            console.error("fetchPopular ERROR :", e);
        }
    };

    const onPopularClick = (url, thumbnailURL) => {
        debugMessage("onPopularClick.playerRef:", playerRef);

        if (playerRef.current) {
            const splayer = Videojs(playerRef.current);
            splayer.src(playerProp.src);
            splayer.poster(playerProp.poster);
            splayer.load();
        }

        setPlayerProp({ src: url, poster: thumbnailURL });
    };

    return (
        <div className='container' style={{ padding: "10px" }}>
            <h1>Court</h1>
            <div className='courts-container'>
                <ul style={{ userSelect: "none" }}>
                    {court.map((c, i) => (
                        <li
                            key={i}
                            onClick={() => fetchPopular(c.clubId, 10)}
                            style={{ cursor: "pointer" }}>
                            courtId: {c.courtId}, Description: {c.description}, cameraId:{" "}
                            {c.cameraId}, clubId: {c.clubId}, courtExtId: {c.courtExtId}
                        </li>
                    ))}
                </ul>
            </div>
            <hr
                style={{ height: "5px", borderWidth: "0", backgroundColor: "black" }}
            />
            <h1>Popular</h1>
            <div className='popular-container'>
                <ul style={{ userSelect: "none" }}>
                    {popular.map((p, i) => (
                        <li
                            key={i}
                            onClick={() => onPopularClick(p.url, p.thumbnailURL)}
                            style={{ cursor: "pointer" }}>
                            Channel: {p.channel}, Description: {p.description}, Club name:{" "}
                            {p.clubName}, Media type: {p.mediaType}, Likes/Dislikes ratio:{" "}
                            {p.likes - p.dislikes}
                        </li>
                    ))}
                </ul>
            </div>
            <hr
                style={{ height: "5px", borderWidth: "0", backgroundColor: "black" }}
            />

            <div className='player-container'>
                <h1>Player</h1>
                {playerProp && <div className="player" style={{ width: "35vw", marginLeft: "10px" }}><StreamPlayer ref={playerRef} props={playerProp} key={playerProp.src} /></div>}
            </div>
        </div>
    );
}

export default Court;
