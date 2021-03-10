import React, { useState, useEffect } from 'react'

function Court({ match }) {
    const axios = require('axios');
    const [court, setCourt] = useState([]);

    useEffect(() => {
        fetchCourt()
    }, []);

    const fetchCourt = async () => {
        try {
            const clubResponse = await axios.get(`https://staging-courts.padelgo.tv/v2/courts/${match.params.courtExtId}`);
            const courtsResponse = await axios.get(`https://staging-courts.padelgo.tv/Courts/${await clubResponse.data.clubId}`);

            console.log(await courtsResponse);
            setCourt(await courtsResponse);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <h1>Court</h1>
        </div>
    )
}

export default Court
