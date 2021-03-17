import { useState, useEffect } from 'react'
import axios from 'axios'
import Courts from './Courts'
import Streams from './Streams'

const Clubs = () => {

    const [clubs, setClubs] = useState([])
    const [clubId, setClubId] = useState()
 
    const url = ('https://staging-clubs.padelgo.tv/Clubs')

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        axios.get(url).then(result => {
            const getData = result.data;
            setClubs(getData);
        })
    }
    function handleClick(val) {
        setClubId(val)
    }

    return (
        <div>
            <ul>{clubs.map((c, i) => (
                <li key={i} onClick={() => handleClick(c.clubId)}>{c.clubId}, {c.name} , {c.country}</li>))}
            </ul>
            <Courts clubId={clubId} />
            <Streams clubId={clubId} />
        </div>
    );
}

export default Clubs


