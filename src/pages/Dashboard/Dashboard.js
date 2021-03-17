import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { debugMsg, setDebugLevel } from "simplistic-log";
import Routes from "../../routes.json";
import { getCourtsWithClubId } from "../../services/Courts.js";
import "./Dashboard.css";

function Home({ match }) {
  setDebugLevel(3);
  debugMsg(match, 2);

  const [court, setCourt] = useState("-1");
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    setCourts(await getCourtsWithClubId(match.params.clubId));
  };

  const toLink = () => {
    const x = courts.find((e) => e.courtExtId === court);
    debugMsg(x, 3);

    return {
      pathname: Routes.COURT,
      props: x,
    };
  };

  return (
    <>
      <div className='vertical-center'>
        <div className='btn-div'>
          <Link className='btn btn-primary' to={`${Routes.COURTS}/${court}`}>
            Arena TV
          </Link>
        </div>
        <div className='btn-group' role='group' aria-label='Court selector'>
          <div className='select-div'>
            <select
              className='form-select'
              aria-label='Default select example'
              value={court}
              onChange={(e) => {
                setCourt(e.currentTarget.value);
              }}>
              <option value='-1' style={{ fontWeight: "bold" }}>
                Courts
              </option>
              <option disabled='disabled'>--------</option>
              {courts.map((c, i) => (
                <option value={c.courtExtId} key={c.courtId}>
                  Court #{c.courtId}
                </option>
              ))}
            </select>
          </div>
          <Link
            className={
              court === "-1" ? "btn btn-primary disabled" : "btn btn-primary"
            }
            to={toLink}>
            Go to court
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
