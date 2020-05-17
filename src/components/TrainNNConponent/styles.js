import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    margin: '40px 80px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '40px',
  },
  settings: {
    display: 'flex',
    justifyContent: 'space-around',
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
  text: {
    display: 'flex',
    alignItems: 'center',
  },
});
