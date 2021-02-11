import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  input: {
    width: '100%',
  },
  projTitle: {
    display: 'inline',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  removeButton: {
    display: 'inline',
    float: 'right',
    marginBottom: '10px',
    backgroundColor: '#BA2D0B',
    color: '#e9ecef',
    '&:hover': {
      backgroundColor: '#1e212d',
      color: '#aaaaaa',
    },
  },
  formItem: {
    marginTop: '15px',
  },
  projContainer: {
    border: '3px solid rgba(183,183,183,0.85)',
    borderRadius: '10px',
    marginTop: '12px',
  },
}));
