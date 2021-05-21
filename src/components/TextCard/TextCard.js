// General imports
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./TextCard.module.scss";

// Components
import ToggleSwitch from "../../components/ToggleSwitch";

/**
 * Bootstrap Component with a SELECT
 * @author Christoffer Hansen
 *
 * @param  {String} textHeader Text that appears as the header on the cards top area
 * @param  {String} textBody Text that appears as the body on the cards middle area
 * @param  {String} linkTo React-Router-DOM link URL
 * @param  {Object} toggleSwitch An object consisting of keys used to check if it should render ToggleSwitch
 * @param  {Function} onToggleChange A function to be called when ToggleSwitch state changes
 * @return {JSX} React JSX Rendering
 */
const TextCard = ({
  textHeader = "TEXT HEADER",
  textBody = "TEXT BODY",
  linkTo = "#",
  toggleSwitch = { show: false, value: -1 },
  onToggleChange = () => {}
}) => {
  const onChange = (e) => {
    onToggleChange();
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
            {toggleSwitch.show && (
              <span className={styles.__dashboard_card_text + " card-text"}>Include livestreams? </span>
            )}
            {toggleSwitch.show && (
              <ToggleSwitch name="__dashboard_card_toggleswitch" value={toggleSwitch.value} onChange={onChange} />
            )}
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
  toggleSwitch: PropTypes.object,
  onToggleChange: PropTypes.func
};

export default TextCard;
