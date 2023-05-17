import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '15px'
  },
  dialogContent: {
    color: theme.palette.type === 'light' ? 'black' : 'white',
  },
}));
