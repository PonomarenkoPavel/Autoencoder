import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  loader: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
