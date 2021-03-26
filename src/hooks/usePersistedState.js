import { useState, useEffect } from "react";

const usePersistedState = (key, defaultValue) => {
  const [state, setState] = useState(
    () => JSON.parse(sessionStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default usePersistedState;
