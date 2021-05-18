import React from "react";
import useGlobalHook from "./GlobalState";

import * as actions from "../actions";

const initialState = {
  showLivestreams: true,
  clubId: undefined,
  clubName: undefined
};

// eslint-disable-next-line react-hooks/rules-of-hooks
const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
