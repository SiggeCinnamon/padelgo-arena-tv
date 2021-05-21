import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./HomeCard.module.scss";
import ToggleSwitch from "../ToggleSwitch";
import useGlobal from "../../vault";
/**
 * Bootstrap Component with a SELECT
 * @author Christoffer Hansen
 *
 * @param  {String} textHeader Text that appears as the header on the cards top area
 * @param  {String} textBody Text that appears as the body on the cards middle area
 * @param  {Array} pOptions The option elements within the SELECT
 * @param  {String} optionHeader The very first option in the SELECT, acts as a description of what the options are
 * @param  {String} linkTo React-Router-DOM link URL
 * @param  {String} clubName A String representing the clubs name
 * @param  {Boolean} useOptionName Boolean that defines whether or not to use the selected options name as club name
 * @param  {Boolean} toggleSwitch Boolean that informs the card whether it should have a ToggleSwitch component or not
 * @return {JSX} React JSX Rendering
 */
const DropCard = ({
  textHeader = "TEXT HEADER",
  textBody = "TEXT BODY",
  pOptions = ["P_OPTIONS"],
  optionHeader = "OPTION HEADER",
  linkTo = "#",
  clubName = undefined,
  useOptionName = false,
}) => {
  const [options, setOptions] = useState(pOptions);
  const [option, setOption] = useState("-1");
  const [name, setName] = useState("");

  useEffect(() => {
    setOptions(pOptions);
  }, [pOptions]);

  return (
    <div className={styles.__dashboard_card + " card"}>
      <div className={styles.__dashboard_card_top + " card-top"}>
        <p>{textHeader}</p>
      </div>
      <div className="card-body">
        <p className={styles.__dashboard_card_text + " card-text"} style={{ whiteSpace: "pre-line" }}>
          {textBody}
        </p>
      </div>
      <div className={styles.__dashboard_div_btn}>
        <div className={styles.__dashboard_dropdown}>
          <div className="btn-group" role="group" aria-label="Court selector">
            <div className="select-div">
              <select
                
                className="form-select"
                aria-label="Default select example"
                value={option + "<->" + name}
              
                onChange={(e) => {
                  const data = e.currentTarget.value.split("<->");
                  setOption(data[0]);
                  setName(data[1]);
                }}
              >
                <option value="-1" style={{ fontWeight: "bold" }}>
                  {optionHeader}
                </option>
                <option disabled="disabled">--------</option>
                {options &&
                  options.map((o, i) => (
                    <option value={o.id + "<->" + o.name} key={o.id + "-" + String(i)}>
                      {o.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.__dashboard_div_btn}>
        <Link type="button"  className={styles.__dashboard_btn + " btn btn-rounded"}
          to={{
            pathname: `${linkTo
              .replace(":clubId", option)
              .replace(":clubName", useOptionName ? name : clubName)
              .replace(linkTo.includes(":courtId") && ":courtId", option)}`,
            state: {
              clubId: option,
              name: name
            }
          }}
        >
          Enter
        </Link>
      </div>
    </div>
  );
};

DropCard.propTypes = {
  textHeader: PropTypes.string,
  textBody: PropTypes.string,
  pOptions: PropTypes.array,
  optionHeader: PropTypes.string,
  linkTo: PropTypes.string,
  clubName: PropTypes.string,
  useOptionName: PropTypes.bool,
  toggleSwitch: PropTypes.bool
};

export default DropCard;