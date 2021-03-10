import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  addFieldBtn: {
    width: '100%',
    height: '100%',
    minHeight: '94px',
  },
  section: {
    marginTop: '15px',
    padding: '16px',
  },
  marginBottom: {
    marginBottom: '25px',
  },
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
