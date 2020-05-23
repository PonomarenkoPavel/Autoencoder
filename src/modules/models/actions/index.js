const PREFIX = 'models';

export const ADD_MODELS = `${PREFIX}/ADD_MODELS`;
export const addModels = (models) => ({
  type: ADD_MODELS,
  models,
});

export const TRAIN_MODEL = `${PREFIX}/TRAIN_MODEL`;
export const trainModel = (options) => ({
  type: TRAIN_MODEL,
  options,
});
