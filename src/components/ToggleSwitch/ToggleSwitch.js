import React from "react";
import PropTypes from "prop-types";
import styles from "./ToggleSwitch.module.scss";

const ToggleSwitch = ({ name = "__ToggleSwitch_checkbox", value = true, onChange, dataYes = "Yes", dataNo = "No" }) => {
  const onClick = (e) => {
    if (onChange) {
      onChange();
    }
  };

  return (
    <>
      <div className={styles.toggle_switch}>
        <input
          type="checkbox"
          className={styles.toggle_switch_checkbox}
          defaultChecked={value}
          name={name}
          id={name}
          value={value}
          onChange={onClick}
        />
        <label className={styles.toggle_switch_label} htmlFor={name}>
          <span className={styles.toggle_switch_inner} data-yes={dataYes} data-no={dataNo} />
          <span className={styles.toggle_switch_switch} />
        </label>
      </div>
    </>
  );
};

ToggleSwitch.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  dataYes: PropTypes.string,
  dataNo: PropTypes.string
};

export default ToggleSwitch;
