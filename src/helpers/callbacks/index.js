export const stopTrainingCallback = () => {
  const state = { stop: false };
  return {
    updateState: (newState) => {
      state.stop = newState;
    },
    stopTraining: (model) => {
      if (state.stop) {
        // eslint-disable-next-line
        model.stopTraining = true;
        state.stop = false;
      }
    },
  };
};
