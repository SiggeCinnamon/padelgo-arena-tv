import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./DropCard.module.scss";

const DropCard = ({ textHeader, textBody, pOptions, optionHeader, linkTo }) => {
  const [options, setOptions] = useState(pOptions);
  const [option, setOption] = useState("-1");

  useEffect(() => {
    setOptions(pOptions);
  }, [pOptions]);

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
                <option value='-1' style={{ fontWeight: "bold" }}>
                  {optionHeader}
                </option>
                <option disabled='disabled'>--------</option>
                {options &&
                  options.map((o, i) => (
                    <option value={o.id} key={o.id + "-" + String(i)}>
                      {o.name}
                    </option>
                  ))}
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
          to={linkTo ? `${linkTo.replace(":id", option)}` : `#`}>
          Start
        </Link>
      </div>
    </div>
  );
};

export default DropCard;
