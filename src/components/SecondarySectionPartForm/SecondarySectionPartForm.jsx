import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  InputAdornment,
  IconButton,
  Grid,
  InputLabel,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Snackbar,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './styles';
import Card from '@material-ui/core/Card';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { handleInput } from '../../services/HandleInput';

import Alert from '../Alert';
import ProjectsForm from '../ProjectsForm/ProjectsForm';

export default function SecondarySectionPartForm({
  sectionsField,
  setValueResponsibility,
  removeFieldResponsibility,
  addFieldResponsibility,
  setSingleObjectField,
  removeTools,
  handleOpenTsForm,
  setSingleFieldProject,
  removeProject,
  setGlobalError,
  changeProjectName,
  handleOpen,
  setSectionField,
}) {
  const [openAlert, setOpenAlert] = useState(false);
  const [sectionArrayName, setSectionArrayName] = useState('');
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const classes = useStyles();
  const isObject = arg => {
    return !!arg && arg.constructor === Object;
  };

  const addNewSectionList = () => {
    const oldState = JSON.parse(localStorage.getItem('updatedSectionState'));
    const newSections = { [sectionArrayName]: [''] };
    const emptyName = /^ *$/.test(sectionArrayName);
    const alreadyExist = Object.keys(oldState).indexOf(sectionArrayName) > -1;
    if (emptyName || alreadyExist) {
      setOpenErrorAlert(true);
    } else {
      setSectionField({ ...oldState, ...newSections });
      setOpenAlert(true);
      setSectionArrayName('');
    }
  };

  const sectionNameValidation = () => {
    let isNum = /^\d+$/.test(sectionArrayName);
    return !sectionArrayName.replace(/\s/g, '').length || sectionArrayName === '' || isNum;
  };

  return (
    <>
      {Object.entries(sectionsField).map(([key, value]) =>
        isObject(value) ? (
          <Card className={classes.section} key={key}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {key}
              <IconButton onClick={key === 'SIGNIFICANT PROJECTS' ? handleOpen : handleOpenTsForm}>
                <AddIcon />
              </IconButton>
            </Typography>
            <Grid container spacing={2} justify="flex-start">
              {Object.entries(value).map(([label, defaultValue]) => (
                <React.Fragment key={label}>
                  {label === '$projects' ? (
                    <ProjectsForm
                      defaultValue={defaultValue}
                      sectionsField={sectionsField}
                      changeProjectName={changeProjectName}
                      setGlobalError={setGlobalError}
                      setSingleFieldProject={setSingleFieldProject}
                      addFieldResponsibility={addFieldResponsibility}
                      setValueResponsibility={setValueResponsibility}
                      removeFieldResponsibility={removeFieldResponsibility}
                      removeProject={removeProject}
                    />
                  ) : (
                    <Grid item sm={6} xs={12} key={`${defaultValue}-grid`}>
                      <InputLabel htmlFor={`${label}-component-outlined`}>
                        <Typography variant="subtitle2">{label}</Typography>
                      </InputLabel>
                      <Tooltip title="Add tools separated by commas">
                        <OutlinedInput
                          id={`${label}-component-outlined`}
                          className={classes.input}
                          key={`${defaultValue}-input`}
                          variant="outlined"
                          defaultValue={defaultValue}
                          onBlur={e =>
                            handleInput(
                              setGlobalError,
                              e.target.value,
                              setSingleObjectField(e.target.value, key, label),
                            )
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                variant="contained"
                                color="secondary"
                                onClick={() => removeTools(label)}
                              >
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </Tooltip>
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Card>
        ) : null,
      )}
      <Card className={classes.addSectionAccordion}>
        <Accordion>
          <AccordionSummary
            color="secondary"
            className={classes.accordionTitle}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="add-sections-content"
          >
            <Typography>Create custom section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              label="Section name"
              variant="outlined"
              defaultValue={sectionArrayName}
              helperText="The name must not contain only spaces (ie. spaces, tabs or line breaks), be empty and contain only numbers."
              onChange={e => setSectionArrayName(e.target.value)}
            />
            <Button
              disabled={sectionNameValidation()}
              className={classes.createButton}
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => addNewSectionList()}
            >
              Create
            </Button>
          </AccordionDetails>
        </Accordion>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
          <Alert onClose={() => setOpenAlert(false)} severity="success">
            Created successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openErrorAlert}
          autoHideDuration={6000}
          onClose={() => setOpenErrorAlert(false)}
        >
          <Alert onClose={() => setOpenErrorAlert(false)} severity="error">
            Section already exists!
          </Alert>
        </Snackbar>
      </Card>
    </>
  );
}

SecondarySectionPartForm.propTypes = {
  sectionsField: PropTypes.objectOf(Object).isRequired,
  setValueResponsibility: PropTypes.func.isRequired,
  removeFieldResponsibility: PropTypes.func.isRequired,
  addFieldResponsibility: PropTypes.func.isRequired,
  setSingleObjectField: PropTypes.func.isRequired,
  removeTools: PropTypes.func.isRequired,
  handleOpenTsForm: PropTypes.func.isRequired,
  setSingleFieldProject: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  changeProjectName: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  setGlobalError: PropTypes.func,
  setSectionField: PropTypes.func,
};
