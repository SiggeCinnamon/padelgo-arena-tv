import React from "react";
import { Link } from "react-router-dom";
import styles from "./TextCard.module.scss";

const TextCard = ({ textHeader, textBody, linkTo }) => {
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

export default TextCard;
