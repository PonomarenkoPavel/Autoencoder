import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'space-around',
  },
});
