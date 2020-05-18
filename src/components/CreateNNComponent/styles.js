import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  container: {
    paddingTop: '24px',
    paddingBottom: '24px',
  },
  form: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  table: {
    marginBottom: '20px',
    '& th': {
      width: '40%',
    },
    '& th:first-child': {
      width: '20%',
    },
  },
  edit: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  yellowTableRow: {
    backgroundColor: '#fffcdd',
    fontStyle: 'italic',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  padding: {
    padding: '0 16px !important',
  },
  background: {
    backgroundColor: '#fff',
  },
});
