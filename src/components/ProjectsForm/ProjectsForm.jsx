import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  Tooltip,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddIcon from '@material-ui/icons/Add';

import { disabledAddField } from '../../services/validationAddField';
import { handleInput } from '../../services/HandleInput';
import { useStyles } from './styles';

export default function ProjectsForm({
  defaultValue,
  sectionsField,
  changeProjectName,
  setGlobalError,
  setSingleFieldProject,
  addFieldResponsibility,
  setValueResponsibility,
  removeFieldResponsibility,
  removeProject,
}) {
  const classes = useStyles();
  const splitValue = proj => {
    const keyProject = Object.keys(proj);
    if (proj[keyProject]['Team']) {
      const teamInfo = proj[keyProject]['Team'];
      const getNumber = teamInfo.split(' ')[0];
      return getNumber;
    }
  };
  return (
    <React.Fragment key={`${defaultValue}-grid`}>
      {sectionsField['SIGNIFICANT PROJECTS'].$projects.map((proj, indexProj) => (
        <Grid
          item
          key={`${Object.keys(proj)}-rpoj-fragment`}
          xs={12}
          className={classes.projContainer}
        >
          <Typography key={Object.keys(proj)} className={classes.projTitle} gutterBottom>
            {`Project: ${Object.keys(proj)}`}
          </Typography>
          <IconButton
            className={classes.removeButton}
            title={`Remove project ${Object.keys(proj)}`}
            variant="contained"
            onClick={() => removeProject(indexProj)}
          >
            <DeleteIcon />
          </IconButton>
          <Grid item sm={12} xs={12} className={classes.formItem}>
            <TextField
              className={classes.input}
              key={`${Object.keys(proj)}-name`}
              fullWidth
              variant="outlined"
              label="Name"
              defaultValue={Object.keys(proj)}
              onBlur={e => changeProjectName(e.target.value, indexProj, Object.keys(proj))}
            />
          </Grid>
          <Grid item xs={12} className={classes.formItem}>
            <Tooltip title="Shortly describe a project. Include product category, target users, and primary features.">
              <TextField
                className={classes.input}
                fullWidth
                key={proj[Object.keys(proj)]['$description']}
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                defaultValue={proj[Object.keys(proj)]['$description']}
                onBlur={e =>
                  handleInput(
                    setGlobalError,
                    e.target.value,
                    setSingleFieldProject(e.target.value, proj, '$description', indexProj),
                  )
                }
              />
            </Tooltip>
          </Grid>
          <>
            {proj[Object.keys(proj)]['Team'] ? (
              <Grid item sm={6} xs={12} className={classes.formItem}>
                <TextField
                  type="number"
                  fullWidth
                  key={proj[Object.keys(proj)]['Team']}
                  className={classes.input}
                  label="Team"
                  variant="outlined"
                  InputProps={{ inputProps: { min: 0 } }}
                  defaultValue={splitValue(proj)}
                  onBlur={e => setSingleFieldProject(+e.target.value, proj, 'Team', indexProj)}
                />
              </Grid>
            ) : null}
          </>
          <Grid item xs={12} className={classes.formItem}>
            <Tooltip title="Add all skills on technologies used in this project, such as programming language, database, and others.">
              <TextField
                className={classes.input}
                key={proj[Object.keys(proj)]['Skills']}
                fullWidth
                variant="outlined"
                label="Skills"
                defaultValue={proj[Object.keys(proj)]['Skills']}
                onBlur={e =>
                  handleInput(
                    setGlobalError,
                    e.target.value,
                    setSingleFieldProject(e.target.value, proj, 'Skills', indexProj),
                  )
                }
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12} className={classes.formItem}>
            <Tooltip title="Ex.: Full-stack Developer">
              <TextField
                className={classes.input}
                fullWidth
                key={proj[Object.keys(proj)]['Role']}
                label="Role"
                variant="outlined"
                defaultValue={proj[Object.keys(proj)]['Role']}
                onBlur={e =>
                  handleInput(
                    setGlobalError,
                    e.target.value,
                    setSingleFieldProject(e.target.value, proj, 'Role', indexProj),
                  )
                }
              />
            </Tooltip>
          </Grid>
          <Grid item sm={12} xs={12} className={classes.formItem}>
            <Typography>
              Responsibilities
              <Tooltip
                element={'span'}
                placement="right"
                title={
                  disabledAddField(proj[Object.keys(proj)]['Responsibilities']) ? (
                    <span style={{ fontSize: '22px' }}>Please fill all input fields</span>
                  ) : (
                    ''
                  )
                }
              >
                <span>
                  <IconButton
                    disabled={disabledAddField(proj[Object.keys(proj)]['Responsibilities'])}
                    variant="contained"
                    onClick={() => addFieldResponsibility(proj, indexProj)}
                  >
                    <AddIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Typography>
          </Grid>
          {proj[Object.keys(proj)]['Responsibilities'].map((res, index) => (
            <Grid item sm={12} xs={12} key={res} className={classes.formItem}>
              <Tooltip title="Add all activities on this project, ex.: Backend development, Code review and optimization.">
                <OutlinedInput
                  className={classes.input}
                  fullWidth
                  defaultValue={res}
                  onBlur={e =>
                    handleInput(
                      setGlobalError,
                      e.target.value,
                      setValueResponsibility(e.target.value, proj, index, indexProj),
                    )
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        variant="contained"
                        color="secondary"
                        onClick={() => removeFieldResponsibility(proj, index, indexProj)}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      ))}
    </React.Fragment>
  );
}

ProjectsForm.propTypes = {
  sectionsField: PropTypes.objectOf(Object).isRequired,
  setValueResponsibility: PropTypes.func.isRequired,
  removeFieldResponsibility: PropTypes.func.isRequired,
  addFieldResponsibility: PropTypes.func.isRequired,
  setSingleObjectField: PropTypes.func,
  removeTools: PropTypes.func,
  handleOpenTsForm: PropTypes.func,
  setSingleFieldProject: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  changeProjectName: PropTypes.func.isRequired,
  handleOpen: PropTypes.func,
  setGlobalError: PropTypes.func,
  defaultValue: PropTypes.array,
};
