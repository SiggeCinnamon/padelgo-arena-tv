import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Routes from "../../routes.json";
import { getClubs } from "../../services/Clubs.js";
import styles from "../Dashboard/Dashboard.module.scss";
function Home() {
  const [clubs, setClubs] = useState("");
  const [club, setClub] = useState("");

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    const fetchGetClubs = await getClubs();
    setClubs(fetchGetClubs);
  };

  return (
    <>
      <nav className={styles.__dashboard_navbar + " navbar"}>
        <span>padelgo.tv - stream for free</span>
      </nav>
      <div className={styles.__dashboard_container + " container"}>
        <div className="d-flex flex-wrap justify-content-center">
         

          {/* Club */}
          <div className="col">
            <div className={styles.__dashboard_card + " card"}>
              <div className={styles.__dashboard_card_top + " card-top"}>
                <p>Clubs</p>
              </div>
              <div className="card-body">
                <p className={styles.__dashboard_card_text + " card-text"}>
                  Pick a club from the list below.
                </p>
              </div>

              {/* DROPDOWNMENU */}
              <div className={styles.__dashboard_dropdown}>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Clubs selector"
                >
                  <div className="select-div">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={club}
                      onChange={(e) => {
                        setClub(e.currentTarget.value);
                      }}
                    >
                      <option value="-1" style={{ fontWeight: "bold" }}>
                        Clubs
                      </option>
                      <option disabled="disabled">--------</option>
                      {clubs &&
                        clubs.map((c, i) => (
                          <option value={c.clubsId} key={c.clubsId}>
                            Club #{c.clubId} at {c.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* DROPDOWNMENU */}
              {/* clubBUTTON */}
              <div className={styles.__dashboard_div_btn}>
                <Link
                  className={
                    club === "-1"
                      ? styles.__dashboard_btn + " btn btn-rounded disabled"
                      : styles.__dashboard_btn + " btn btn-rounded"
                  }
                  to={`${Routes.DASHBOARD.replace(":clubId", club)}`}
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

export default Home;
