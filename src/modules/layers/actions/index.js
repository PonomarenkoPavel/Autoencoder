const PREFIX = 'layers';

export const ADD_LAYERS_PARAMETERS = `${PREFIX}/ADD_LAYERS_PARAMETERS`;
export const addLayersParameters = (param) => ({
  type: ADD_LAYERS_PARAMETERS,
  param,
});
