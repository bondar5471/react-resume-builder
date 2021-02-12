import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  card: {
    padding: '16px',
    marginTop: '15px',
  },
  inputFileName: {
    marginTop: '8px',
  },
  gitButton: {
    marginTop: '15px',
    backgroundColor: '#989898',
  },
  saveAsButton: {
    marginTop: '15px',
    backgroundColor: '#989898',
  },
  saveAsFileContainer: {
    padding: '30px',
  },
  downloadButton: {
    marginBottom: '8px',
    marginTop: '8px',
  },
  gitUploadContainer: {
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingBottom: '10px',
  },
}));
