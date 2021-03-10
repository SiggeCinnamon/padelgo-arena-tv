import React, { useState, useEffect } from 'react';
import StreamPlayer from './StreamPlayer.js';

function Court({ match }) {
    const axios = require('axios');
    const [court, setCourt] = useState([]);
    const [src, setSrc] = useState("");


    useEffect(() => {
        fetchCourt();
    }, []);

    useEffect(() => {
        initStreamSrc();
    }, [court]);

    const fetchCourt = async () => {
        try {
            const clubResponse = await axios.get(`https://staging-courts.padelgo.tv/v2/courts/${match.params.courtExtId}`);
            const courtsResponse = await axios.get(`https://staging-courts.padelgo.tv/Courts/${await clubResponse.data.clubId}`);

            setCourt(courtsResponse.data);

            console.log("fetchCourt.courtsResponse.data:", courtsResponse.data);
        } catch (e) {
            console.error("fetchCourt ERROR :", e);
        }
    }

    const initStreamSrc = async () => {
        try {
            console.log("initStreamSrc.court:", court);
            console.log("initStreamSrc.court[0]:", court[0]);
            const body = {
                "clubId": court[0].clubId,
                "stream": true,
                "liveStream": true,
                "highlight": true,
                "video": true,
                "page": 1,
                "take": 1,
                "sortOrder": 0
            }

            const response = await axios.post(`https://staging-streams.padelgo.tv/Media/popular`, body);
            setSrc(response.data[0].url);

            return response.data[0].url;
        } catch (e) {
            console.error("initStreamSrc ERROR :", e);
        }
    }

    return (
        <div>
            <h1>Court</h1>
            <StreamPlayer props={src} />
        </div>
    )
}

export default Court
