import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  wrapper: {
    padding: '40px 80px',
  },
  '@media (min-width: 2140px)': {
    wrapper: {
      maxWidth: 1980,
      margin: '40px auto',
      boxSizing: 'border-box',
    },
  },
});
