export const setAppState = (vault, state) => {
  vault.setState(state);
};

export const setShowLivestreams = (vault, state) => {
  vault.setState({ showLivestreams: state });
};
