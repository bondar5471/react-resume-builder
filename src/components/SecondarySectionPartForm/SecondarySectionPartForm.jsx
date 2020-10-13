import React from 'react';
import PropTypes from 'prop-types';
import { Typography, InputAdornment, IconButton, Grid, InputLabel } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './styles';
import Card from '@material-ui/core/Card';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { handleInput } from '../../services/HandleInput';

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
}) {
  const classes = useStyles();
  const isObject = arg => {
    return !!arg && arg.constructor === Object;
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
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Card>
        ) : null,
      )}
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
};
