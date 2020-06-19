const PREFIX = 'data';

export const FETCH_DATA = `${PREFIX}/FETCH_DATA`;
export const fetchData = () => ({
  type: FETCH_DATA,
});

export const FETCH_DATA_SUCCESS = `${PREFIX}/FETCH_DATA_SUCCESS`;
export const fetchDataSuccess = (payload) => ({
  type: FETCH_DATA_SUCCESS,
  payload,
});

export const SET_STATUS = `${PREFIX}/SET_STATUS`;
export const setDataStatus = (status) => ({
  type: SET_STATUS,
  status,
});

export const EDIT_INIT_IMAGE_IDS = `${PREFIX}/EDIT_INIT_IMAGE_IDS`;
export const editInitImageIds = (ids) => ({
  type: EDIT_INIT_IMAGE_IDS,
  ids,
});
