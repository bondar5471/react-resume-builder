import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  main: {
    padding: '20px',
  },
  marginBottom: {
    marginBottom: '10px',
  },
  addButtonBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginTop: '15px',
    padding: '16px',
  },
  sectionForms: {
    marginTop: '15px',
  },
  addIcon: {
    marginTop: theme.spacing(2),
    backgroundColor: '#07689f',
    '&:hover': {
      backgroundColor: '#d6e0f0',
    },
    color: '#393b44',
  },
  scroll: {
    position: 'fixed',
    width: '56px',
    bottom: '20px',
    right: '6%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
    cursor: 'pointer',
    animation: 'fadeIn 0.3s',
    transition: 'opacity 0.4s',
    opacity: '0.5',
  },
}));
