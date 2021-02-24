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
  pathBar: {
    border: '3px solid #1C6EA4',
    borderRadius: '30px',
  },
}));
