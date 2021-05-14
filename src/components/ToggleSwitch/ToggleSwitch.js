import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./ToggleSwitch.module.scss";

const ToggleSwitch = ({ name, value, onChange, dataYes, dataNo }) => {
  
    const onClick = (e) => {
        if (onChange) {
            onChange();
        }
    }

    useEffect(() => {
        console.log("TS.value:", value);
    }, [value]);
  
    return (
    <>
      <div className={styles.toggle_switch}>
        <input type="checkbox" className={styles.toggle_switch_checkbox} name={name} id={name} value={value} onChange={onClick}/>
        <label className={styles.toggle_switch_label} htmlFor={name}>
          <span className={styles.toggle_switch_inner} data-yes={dataYes} data-no={dataNo} />
          <span className={styles.toggle_switch_switch} />
        </label>
      </div>
    </>
  );
};

ToggleSwitch.defaultProps = {
    name: "__ToggleSwitch_checkbox",
    value: 0,
    dataYes: "Yes",
    dataNo: "No"
}

export default ToggleSwitch;
