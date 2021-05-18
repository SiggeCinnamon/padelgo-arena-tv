// General imports
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./TextCard.module.scss";
import useGlobal from "../../vault";

// Components
import ToggleSwitch from "../../components/ToggleSwitch";

/**
 * Bootstrap Component with a SELECT
 * @author Christoffer Hansen
 *
 * @param  {String} textHeader Text that appears as the header on the cards top area
 * @param  {String} textBody Text that appears as the body on the cards middle area
 * @param  {String} linkTo React-Router-DOM link URL
 * @return {JSX} React JSX Rendering
 */
const TextCard = ({ textHeader = "TEXT HEADER", textBody = "TEXT BODY", linkTo = "#", toggleSwitch = false }) => {
  const [globalState, globalActions] = useGlobal();
  const [value, setValue] = useState(globalState.showLivestreams !== undefined ? globalState.showLivestreams : true);

  const onChange = (e) => {
    globalActions.setShowLivestreams(!value);
    setValue(!value);
  };

  return (
    <div className={styles.__dashboard_card + " card"}>
      <div className={styles.__dashboard_card_top + " card-top"}>
        <p>{textHeader}</p>
      </div>
      <div className="card-body">
        <div>
          <p className={styles.__dashboard_card_text + " card-text"} style={{ whiteSpace: "pre-line" }}>
            {textBody}
          </p>
          <div style={{ textAlign: "center" }}>
            {toggleSwitch && <span className={styles.__dashboard_card_text + " card-text"}>Include livestreams? </span>}
            {toggleSwitch && <ToggleSwitch name="__dashboard_card_toggleswitch" value={value} onChange={onChange} />}
          </div>
        </div>
      </div>
      <div className={styles.__dashboard_div_btn}>
        <Link type="button" className={styles.__dashboard_btn + " btn btn-rounded"} to={linkTo}>
          Start
        </Link>
      </div>
    </div>
  );
};

TextCard.propTypes = {
  textHeader: PropTypes.string,
  textBody: PropTypes.string,
  linkTo: PropTypes.string,
  toggleSwitch: PropTypes.bool
};

export default TextCard;
