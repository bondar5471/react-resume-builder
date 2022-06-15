import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  Tooltip,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { useStyles } from './styles';

export default function AddEducationInfo({
  openEducationForm,
  handleCloseCreate,
  addFieldToEducation,
  institution,
  degree,
  setInstitution,
  setDegree,
}) {
  const classes = useStyles();
  const educationList = [
    'National Technical University "Kharkiv Polytechnic Institute"',
    'National University of Pharmacy',
    'O.M.Beketov National University of Urban Economy in Kharkiv',
    'V.N.Karazin Kharkiv National University',
    'Yaroslav Mudryi National Law University',
    'Simon Kuznets Kharkiv National University of Economics',
    'Ukrainian State University of Railway Transport',
    'Kharkov National Automobile and Highway University',
    'Kharkiv National University of Internal Affairs',
    'Kharkiv National University of Radio Electronics',
    'Kharkiv National Medical University',
    'H.S.Skovoroda Kharkiv National  Pedagogical University',
    'Kharkiv Petro Vasylenko National Technical University of Agriculture',
    'National Aerospace University «Kharkiv Aviation Institute»"',
    'Kharkiv National University of Civil Engineering and Architecture',
    'Kharkiv State University of Nutrition and Trade',
    'Ukrainian Engineering Pedagogics Academy',
    'Kharkov State Academy of Physical Culture',
    'Kharkiv State Academy of Culture',
    'Kharkiv Institute of Trade and Economics KNTEU',
    'Kharkiv Humanitarian Pedagogical Academy of the Kharkiv Regional Council',
    'National University of Civil Defence of Ukraine',
    'Kharkiv State Academy of Design and Art',
    'Kharkiv I.P.Kotlyarevsky National University of Arts',
    'Kharkiv Institute of Finance of the Ukrainian State University of Finance and International Trade',
    'Kharkov Socio-Economic Institute',
    'Kharkiv Institute of Banking of the University of Banking of the National Bank of Ukraine',
    'Guards Order of the Red Star Faculty of Military Training named after the Verkhovna Rada of Ukraine NTU "KhPI"',
    'Kharkiv Air University named after Ivan Kozhedub',
    'National Academy of the National Guard of Ukraine',
    'Kharkiv Regional Institute of Public Administration of the National Academy of Public Administration under the President of Ukraine'
  ];
  return (
    <Dialog
      open={openEducationForm}
      onClose={handleCloseCreate}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add education information</DialogTitle>
      <form
        onSubmit={e => {
          e.preventDefault();
          addFieldToEducation([institution, degree]);
          handleCloseCreate();
        }}
      >
        <DialogContent>
          <Tooltip title="ex.: KARAZIN KHARKIV NATIONAL UNIVERSITY">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={educationList}
              sx={{ width: 300 }}
              renderInput={(params) => 
                <TextField
                  {...params} 
                  required
                  className={classes.marginBottom}
                  fullWidth
                  variant="outlined"
                  label="Educational institution"
                  onBlur={e => setInstitution(e.target.value)}
                />
              }
            />
          </Tooltip>
          <Tooltip title="ex.: Master's degree in System engineering">
            <TextField
              required
              className={classes.marginBottom}
              fullWidth
              variant="outlined"
              label="Degree"
              onBlur={e => setDegree(e.target.value)}
            />
          </Tooltip>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="default" type="submit">
            Add
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCloseCreate}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

AddEducationInfo.propTypes = {
  institution: PropTypes.string,
  degree: PropTypes.string,
  setDegree: PropTypes.func,
  setInstitution: PropTypes.func,
  openEducationForm: PropTypes.bool,
  handleCloseCreate: PropTypes.func,
  addFieldToEducation: PropTypes.func,
};
