import React from "react";
import Routes from "../../routes.json";
import styles from "../Dashboard/Dashboard.module.scss";
import NavBar from "../../components/NavBar";
import useFetchClubs from "../../hooks/useFetchClubs.js";

import HomeCard from "../../components/HomeCard/HomeCard";

const Home = () => {
  const [clubs, setClubs] = useFetchClubs();

  return (
    <>
      <NavBar />
      <div className={styles.__dashboard_container + " container"}>
        <HomeCard
          textHeader="Clubs"
          textBody="Pick a club from the list below"
          pOptions={clubs.sort((a, b) => a.name.localeCompare(b.name, "se", { numeric: true }))}
          optionHeader="Clubs"
          useOptionName={true}
          linkTo={Routes.DASHBOARD}
        />
      </div>
    </>
  );
};

export default Home;
