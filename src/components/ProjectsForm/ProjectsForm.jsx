import React, { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Tooltip,
  IconButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { disabledAddField } from '../../services/validationAddField';
import { handleInput } from '../../services/HandleInput';
import { useStyles } from './styles';
import { projectResponsibility } from '../../template/projectResponsibility';

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
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <React.Fragment key={`${defaultValue}-grid`}>
      {sectionsField['SIGNIFICANT PROJECTS'].$projects.map((proj, indexProj) => (
        <Accordion
          className={classes.root}
          expanded={expanded === Object.keys(proj)[0]}
          onChange={handleChange(Object.keys(proj)[0])}
          key={`${Object.keys(proj)}-project-fragment`}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <AccordionActions>
              <IconButton
                className={classes.removeButton}
                title={`Remove project ${Object.keys(proj)}`}
                variant="contained"
                onClick={() => removeProject(indexProj)}
              >
                <DeleteIcon />
              </IconButton>
            </AccordionActions>
            <Typography key={Object.keys(proj)} className={classes.projTitle} gutterBottom>
              {`Project: ${Object.keys(proj)}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid item xs={12} className={classes.projContainer}>
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
                {typeof proj[Object.keys(proj)]['Team'] !== 'undefined' ? (
                  <Grid item sm={6} xs={12} className={classes.formItem}>
                    <TextField
                      fullWidth
                      key={proj[Object.keys(proj)]['Team']}
                      className={classes.input}
                      label="Team"
                      variant="outlined"
                      defaultValue={proj[Object.keys(proj)]['Team']}
                      onBlur={e => setSingleFieldProject(e.target.value, proj, 'Team', indexProj)}
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
              {proj[Object.keys(proj)]['Responsibilities'] ? (
                <React.Fragment>
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
                  <>
                    {proj[Object.keys(proj)]['Responsibilities'] &&
                      proj[Object.keys(proj)]['Responsibilities'].map((res, index) => (
                        <Grid
                          item
                          sm={12}
                          xs={12}
                          key={`${index}-res`}
                          className={classes.formItem}
                        >
                          <Grid container alignItems="flex-end">
                            <Grid item style={{ width: '95%' }}>
                              <Autocomplete
                                onInputChange={(event, newValue) =>
                                  handleInput(
                                    setGlobalError,
                                    newValue,
                                    setValueResponsibility(newValue, proj, index, indexProj),
                                  )
                                }
                                freeSolo
                                value={res}
                                options={projectResponsibility}
                                renderInput={params => <TextField {...params} variant="outlined" />}
                              />
                            </Grid>
                            <Grid item>
                              <IconButton
                                variant="contained"
                                color="secondary"
                                onClick={() => removeFieldResponsibility(proj, index, indexProj)}
                              >
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                  </>
                </React.Fragment>
              ) : null}
            </Grid>
          </AccordionDetails>
        </Accordion>
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
