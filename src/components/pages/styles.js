import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'absolute',
  },
  description: {
    marginBottom: '40px',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'space-around',
  },
});
