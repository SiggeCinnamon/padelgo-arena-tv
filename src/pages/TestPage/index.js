import React, { useState, useEffect } from "react";
import ToggleSwitch from "../../components/ToggleSwitch";

const Index = () => {
    const [value, setValue] = useState(1);

    const onChange = (e) => {
        setValue(value === 0 ? 1 : 0);
    }

    useEffect (() => {
        console.log("I.value:", value);
    }, [value]);

  return <div>
      Include livestreams? <ToggleSwitch name="pewpew" value={value} onChange={onChange} />
  </div>;
};

export default Index;
