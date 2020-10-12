import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
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
    color: '#000',
    marginTop: theme.spacing(1),
    border: '2px solid #838383',
  },
}));
