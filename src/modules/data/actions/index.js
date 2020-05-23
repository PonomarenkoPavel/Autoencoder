const PREFIX = 'data';

export const FETCH_DATA = `${PREFIX}/FETCH_DATA`;
export const fetchData = () => ({
  type: FETCH_DATA,
});

export const FETCH_DATA_SUCCESS = `${PREFIX}/FETCH_DATA_SUCCESS`;
export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  data,
});

export const SET_STATUS = `${PREFIX}/SET_STATUS`;
export const setDataStatus = (status) => ({
  type: SET_STATUS,
  status,
});
