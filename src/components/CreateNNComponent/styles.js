import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '40px 80px',
  },
  form: {
    marginTop: '20px',
    display: 'flex',
    '& > *': {
      marginRight: '15px',
    },
  },
  layers: {
    marginTop: '20px',
  },
  table: {
    maxWidth: 650,
    marginTop: '20px',
  },
});
