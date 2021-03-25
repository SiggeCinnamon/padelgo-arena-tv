import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Routes from "../../routes.json";
import { getCourtsWithClubId } from "../../services/Court.js";

import "./Dashboard.scss";

function Dashboard({ match }) {
  const [court, setCourt] = useState("-1");
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    setCourts(await getCourtsWithClubId(match.params.clubId));
  };

  const toArenaTv = () => {
    return {
      pathname: Routes.ARENA_TV,
      props: { clubId: match.params.clubId },
    };
  };

  return (
      <>
    
      <nav className="navbar">
        <span className="navbar">padelgo.tv - stream for free</span>
      </nav>
      <div className="container flex-nowrap justify-content-center">
        <div className="row justify-content-md-center">
          <div className="col-md">
            {/* ARENATV */}

            <div className="card">
              <div className="card-top">Showcase</div>
              <div className="card-body">
              <div>
                <p className="card-text">
                  
                    Continuously display highlights and streams from your club
                    in fullscreen.
                    <br />
                    <br />
                    Return here by clicking at padelgo.tv in the top right or
                    press ESC.
                  
                </p>
                </div>
              </div>
              <div className="div-btn">
                <Link
                  type="button"
                  className="btn btn-secondary btn-rounded"
                  to={toArenaTv}
                >
                  Start
                </Link>
              </div>
            </div>
          </div>
          {/* ARENATV */}

          {/* SCORE */}
          <div className="col-md">
            <div className="card">
              <div className="card-top">Score</div>
              <div className="card-body">
                <p className="card-text">
                  Display the current score from a live stream. Pick a court in
                  the list below.
                </p>
              </div>

              {/* DROPDOWNMENU */}
              <div className="dropdown">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Court selector"
                >
                  <div className="select-div">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={court}
                      onChange={(e) => {
                        setCourt(e.currentTarget.value);
                      }}
                    >
                      <option value="-1" style={{ fontWeight: "bold" }}>
                        Courts
                      </option>
                      <option disabled="disabled">--------</option>
                      {courts &&
                        courts.map((c, i) => (
                          <option value={c.courtId} key={c.courtId}>
                            Court #{c.courtId} at {c.description}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* DROPDOWNMENU */}
              {/* COURTBUTTON */}
              <div className="div-btn">
                <Link
                  className={
                    court === "-1"
                      ? "btn btn-primary disabled"
                      : "btn btn-primary"
                  }
                  to={`${Routes.COURT.replace(":courtId", court)}`}
                >
                  Start
                </Link>
              </div>
              {/* COURTBUTTON */}
            </div>
          </div>
          {/* SCORE */}
        </div>
      </div>
   
    </>
  );
}

export default Dashboard;
