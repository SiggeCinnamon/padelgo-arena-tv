import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Routes from "../../routes.json";
import { getClubDataWithClubId } from "../../services/Clubs.js";
import styles from "./Dashboard.module.scss";
import NavBar from "../../components/NavBar/NavBar.js";
import useFetchCourts from "../../hooks/useFetchCourts.js";

function Dashboard({ match }) {
  const [court, setCourt] = useState("-1");
  const [courts, setCourts] = useFetchCourts(match.params.clubId);
  const [club, setClub] = useState({});

  useEffect(() => {
    fetchClubData();
  }, [courts]);

  const fetchClubData = async () => {
    setClub(await getClubDataWithClubId(match.params.clubId));
  };

  return (
    <>
      <NavBar />
      <div className={styles.__dashboard_container + " container"}>
        <div className='d-flex flex-wrap justify-content-center'>
          <div className='col'>
            {/* ARENATV */}
            <div className={styles.__dashboard_card + " card"}>
              <div className={styles.__dashboard_card_top + " card-top"}>
                <p>Showcase</p>
              </div>
              <div className='card-body'>
                <div>
                  <p className={styles.__dashboard_card_text + " card-text"}>
                    Continuously display highlights and streams from your club
                    in fullscreen.
                    <br />
                    <br />
                    Return here by clicking at padelgo.tv in the top left or
                    press ESC.
                  </p>
                </div>
              </div>
              <div className={styles.__dashboard_div_btn}>
                <Link
                  type='button'
                  className={styles.__dashboard_btn + " btn btn-rounded"}
                  to={`${Routes.ARENA_TV.replace(
                    ":clubId",
                    match.params.clubId
                  )}`}>
                  Start
                </Link>
              </div>
            </div>
          </div>
          {/* ARENATV */}

          {/* SCORE */}
          <div className='col'>
            <div className={styles.__dashboard_card + " card"}>
              <div className={styles.__dashboard_card_top + " card-top"}>
                <p>Score</p>
              </div>
              <div className='card-body'>
                <p className={styles.__dashboard_card_text + " card-text"}>
                  Display the current score from a live stream. Pick a court in
                  the list below.
                </p>
              </div>

              {/* DROPDOWNMENU */}
              <div className={styles.__dashboard_dropdown}>
                <div
                  className='btn-group'
                  role='group'
                  aria-label='Court selector'>
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
                            Court #{c.courtId} at {club.name}
                          </option>
                        ))}
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
        </div>
      </div>
    </>
  );
}

export default Dashboard;
