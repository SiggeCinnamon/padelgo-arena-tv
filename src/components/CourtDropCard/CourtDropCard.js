import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./CourtDropCard.module.scss";
import Routes from "../../routes.json";

const DropCard = ({ textHeader, textBody, pOptions, pAlt }) => {
  const [options, setOptions] = useState(pOptions);
  const [option, setOption] = useState();
  const [alt, setAlt] = useState(pAlt);

  useEffect(() => {
    setOptions(pOptions);
  }, [pOptions]);

  useEffect(() => {
    setAlt(pAlt);
  }, [pAlt]);

  return (
    <div className={styles.__dashboard_card + " card"}>
      <div className={styles.__dashboard_card_top + " card-top"}>
        <p>{textHeader}</p>
      </div>
      <div className='card-body'>
        <p
          className={styles.__dashboard_card_text + " card-text"}
          style={{ whiteSpace: "pre-line" }}>
          {textBody}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <div className={styles.__dashboard_dropdown}>
          <div className='btn-group' role='group' aria-label='Court selector'>
            <div className='select-div'>
              <select
                className='form-select'
                aria-label='Default select example'
                value={option}
                onChange={(e) => {
                  setOption(e.currentTarget.value);
                }}>
                <optgroup className={styles.__dashboard_optgroup}>
                  <option value='-1' style={{ fontWeight: "bold" }}>
                    Courts
                  </option>
                  <option disabled='disabled'>--------</option>
                  {options &&
                    options.map((o, i) => (
                      <option value={o.courtId} key={o.courtId}>
                        Court #{o.courtId} at {alt.name}
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.__dashboard_div_btn}>
        <Link
          className={
            option === "-1"
              ? styles.__dashboard_btn + " btn btn-rounded disabled"
              : styles.__dashboard_btn + " btn btn-rounded"
          }
          to={`${Routes.COURT.replace(":courtId", option)}`}>
          Start
        </Link>
      </div>
    </div>
  );
};

export default DropCard;
