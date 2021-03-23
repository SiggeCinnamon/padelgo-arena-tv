import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Routes from "../../routes.json";
import { getCourtsWithClubId } from "../../services/Court.js";

import "./Dashboard.css";

function Dashboard({ match }) {
  const [court, setCourt] = useState("-1");
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    setCourts(await getCourtsWithClubId(match.params.clubId));

    const toArenaTv = () => {
      return {
        pathname: Routes.ARENA_TV,
        props: { clubId: match.params.clubId },
      };
    };

    return (
      <>
        <div className='vertical-center'>
          <div className='btn-div'>
            <Link className='btn btn-primary' to={toArenaTv}>
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
                {courts &&
                  courts.map((c, i) => (
                    <option value={c.courtId} key={c.courtId}>
                      Court #{c.courtId}
                    </option>
                  ))}
              </select>
            </div>
            <Link
              className={
                court === "-1" ? "btn btn-primary disabled" : "btn btn-primary"
              }
              to={`${Routes.COURT.replace(":courtId", court)}`}>
              Go to court
            </Link>
          </div>
        </div>
      </>
    );
  };
}

export default Dashboard;
