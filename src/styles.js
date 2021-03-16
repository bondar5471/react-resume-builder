import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: '#bbbbbb',
  },
  appBar: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: '100%',
    height: 'auto',
  },
  toolBar: {
    justifyContent: 'space-between',
  },
  globalStyleButton: {
    marginLeft: '75%',
  },
  buttonGroup: {
    display: 'flex',
  },
  userName: {
    marginTop: 11,
  },
}));
