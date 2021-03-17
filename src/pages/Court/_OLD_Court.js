import React, { useState, useEffect, useRef } from "react";
import { debugMsg, setDebugLevel } from "simplistic-log";
import StreamPlayer from "../../components/StreamPlayer/StreamPlayer.js";
import Videojs from "video.js";
import axios from "axios";

function Court({ match }) {
    setDebugLevel(1);

    const [court, setCourt] = useState([]);
    const [popular, setPopular] = useState([]);
    const [playerProp, setPlayerProp] = useState("");
    const [streams, setStreams] = useState("");

    const playerRef = useRef(null);

    useEffect(() => {
        fetchCourt();
    }, []);

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
            debugMsg(await courtsResponse.data, 1);
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
            debugMsg(response.data, 1);
            setPopular(response.data);

            let dto = { data: [], key: streams.key === 0 ? 1 : 0 };

            response.data.forEach((e) => {
                dto.data.push({
                    sources: [{
                        src: e.url,
                        type: 'video/mp4'
                    }],
                    poster: e.thumbnailURL
                });
            });

            debugMsg(dto, 1);
            setStreams(dto);
        } catch (e) {
            console.error("fetchPopular ERROR :", e);
        }
    };

    const onPopularClick = (url, thumbnailURL) => {
        debugMsg(playerRef, 1);

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
                {streams && <div className="player" style={{ width: "35vw", marginLeft: "10px" }}><StreamPlayer ref={playerRef} props={streams} key={streams.key} /></div>}
            </div>
        </div>
    );
}

export default Court;
