import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    paddingTop: '24px',
    paddingBottom: '24px',
  },
  form: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  editedRow: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    '& $padding': {
      padding: '8px 16px 4px',
    },
    '& .MuiOutlinedInput-inputMarginDense': {
      backgroundColor: '#fff',
    },
  },
  yellowTableRow: {
    backgroundColor: '#fffcdd',
    fontStyle: 'italic',
  },
  padding: {},
});
