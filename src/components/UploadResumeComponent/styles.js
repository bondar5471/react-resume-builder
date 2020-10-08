import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  form: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(8),
  },
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  editButton: {
    marginTop: theme.spacing(2),
  },
  spin: {
    marginLeft: '47%',
    marginRight: '47%',
    width: '6%',
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  list: {
    margin: theme.spacing(2),
  },
  listItem: {
    backgroundColor: '#e1f2fb',
    marginTop: theme.spacing(1),
    border: '2px solid #838383',
  },
}));
