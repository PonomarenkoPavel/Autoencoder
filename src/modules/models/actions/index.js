const PREFIX = 'models';

export const CREATE_MODELS = `${PREFIX}/CREATE_MODELS`;
export const createModels = (options) => ({
  type: CREATE_MODELS,
  options,
});

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

export const TRAIN_MODEL_SUCCESS = `${PREFIX}/TRAIN_MODEL_SUCCESS`;
export const trainModelSuccess = () => ({
  type: TRAIN_MODEL_SUCCESS,
});

export const TEST_MODEL = `${PREFIX}/TEST_MODEL`;
export const testModel = (imageNumber) => ({
  type: TEST_MODEL,
  imageNumber,
});
