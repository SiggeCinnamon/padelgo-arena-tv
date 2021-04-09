import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Routes from "../../routes.json";
import styles from "./Dashboard.module.scss";
import NavBar from "../../components/NavBar";
import useFetchCourts from "../../hooks/useFetchCourts.js";
import useFetchClub from "../../hooks/useFetchClub.js";

function Dashboard({ match, history }) {
  const [court, setCourt] = useState("-1");
  const [courts, setCourts] = useFetchCourts(match.params.clubId);
  const [club, setClub] = useFetchClub(match.params.clubId);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDownHandler);
    return () => {
      document.removeEventListener("keydown", onKeyDownHandler);
    };
  }, []);

  const onKeyDownHandler = (event) => {
    if (event.defaultPrevented) return;

    switch (event.key) {
      case "Escape":
        history.goBack();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.__dashboard_container + " container-fluid"}>
        {/* ARENATV */}
        <div className={styles.__dashboard_card + " card"}>
          <div className={styles.__dashboard_card_top + " card-top"}>
            <p>Showcase</p>
          </div>
          <div className='card-body'>
            <div>
              <p className={styles.__dashboard_card_text + " card-text"}>
                Continuously display highlights and streams from your club in
                fullscreen.
                <br />
                <br />
                Return here by clicking at padelgo.tv in the top left or press
                ESC.
              </p>
            </div>
          </div>
          <div className={styles.__dashboard_div_btn}>
            <Link
              type='button'
              className={styles.__dashboard_btn + " btn btn-rounded"}
              to={`${Routes.ARENA_TV.replace(":clubId", match.params.clubId)}`}>
              Start
            </Link>
          </div>
        </div>
        {/* ARENATV */}

        {/* SCORE */}
        <div className={styles.__dashboard_card + " card"}>
          <div className={styles.__dashboard_card_top + " card-top"}>
            <p>Score</p>
          </div>
          <div className='card-body'>
            <p className={styles.__dashboard_card_text + " card-text"}>
              Display the current score from a live stream. Pick a court in the
              list below.
            </p>
          </div>

          {/* DROPDOWNMENU */}
          <div className={styles.__dashboard_dropdown}>
            <div className='btn-group' role='group' aria-label='Court selector'>
              <div className='select-div'>
                <select
                  className='form-select'
                  aria-label='Default select example'
                  value={court}
                  onChange={(e) => {
                    setCourt(e.currentTarget.value);
                  }}>
                  <optgroup className={styles.__dashboard_optgroup}>
                    <option value='-1' style={{ fontWeight: "bold" }}>
                      Courts
                    </option>
                    <option disabled='disabled'>--------</option>
                    {courts &&
                      courts.map((c, i) => (
                        <option value={c.courtId} key={c.courtId}>
                          Court #{c.courtId} at {club.name}
                        </option>
                      ))}
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
          {/* DROPDOWNMENU */}
          {/* COURTBUTTON */}
          <div className={styles.__dashboard_div_btn}>
            <Link
              className={
                court === "-1"
                  ? styles.__dashboard_btn + " btn btn-rounded disabled"
                  : styles.__dashboard_btn + " btn btn-rounded"
              }
              to={`${Routes.COURT.replace(":courtId", court)}`}>
              Start
            </Link>
          </div>
          {/* COURTBUTTON */}
        </div>
      </div>
      {/* SCORE */}
    </>
  );
}

export default withRouter(Dashboard);
