import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./TextCard.module.scss";

/**
 * Bootstrap Component with a SELECT
 * @author Christoffer Hansen
 *
 * @param  {String} textHeader Text that appears as the header on the cards top area
 * @param  {String} textBody Text that appears as the body on the cards middle area
 * @param  {String} linkTo React-Router-DOM link URL
 * @return {JSX} React JSX Rendering
 */
const TextCard = ({
  textHeader = "TEXT HEADER",
  textBody = "TEXT BODY",
  linkTo = "#",
}) => {
  return (
    <div className={styles.__dashboard_card + " card"}>
      <div className={styles.__dashboard_card_top + " card-top"}>
        <p>{textHeader}</p>
      </div>
      <div className='card-body'>
        <div>
          <p
            className={styles.__dashboard_card_text + " card-text"}
            style={{ whiteSpace: "pre-line" }}>
            {textBody}
          </p>
        </div>
      </div>
      <div className={styles.__dashboard_div_btn}>
        <Link
          type='button'
          className={styles.__dashboard_btn + " btn btn-rounded"}
          to={linkTo}>
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
};

export default TextCard;
