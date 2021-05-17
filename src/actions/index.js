export const setAppState = (store, state) => {
  store.setState(state);
};

export const setShowLivestreams = (store, state) => {
  store.setState({ showLivestreams: state });
};
