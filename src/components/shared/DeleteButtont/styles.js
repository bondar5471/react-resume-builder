import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  removeSectionButton: {
    display: 'inline',
    float: 'right',
    marginBottom: '10px',
    color: '#e9ecef',
    '&:hover': {
      backgroundColor: '#1e212d',
      color: '#aaaaaa',
    },
  },
}));
