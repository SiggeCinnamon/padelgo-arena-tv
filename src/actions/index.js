export const setAppState = (vault, state) => {
  vault.setState(state);
};

export const setShowLivestreams = (vault, state) => {
  vault.setState({ showLivestreams: state });
};

export const setClubId = (vault, state) => {
  vault.setState({ clubId: state });
};

export const setClubName = (vault, state) => {
  vault.setState({ clubName: state });
};
