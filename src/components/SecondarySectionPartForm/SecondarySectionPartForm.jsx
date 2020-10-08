import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  InputAdornment,
  IconButton,
  Button,
  TextField,
  Grid,
  Tooltip,
  InputLabel,
} from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './styles';
import Card from '@material-ui/core/Card';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { handleInput } from '../../services/HandleInput';

import { disablebAddField } from '../../services/validationAddField';

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
  const splitValue = proj => {
    const keyProject = Object.keys(proj);
    if (proj[keyProject]['Team']) {
      const teamInfo = proj[keyProject]['Team'];
      const getNumber = teamInfo.split(' ')[0];
      return getNumber;
    }
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
                    <React.Fragment key={`${defaultValue}-grid`}>
                      {sectionsField['SIGNIFICANT PROJECTS'].$projects.map((proj, indexProj) => (
                        <React.Fragment key={`${Object.keys(proj)}-rpoj-fragment`}>
                          <Grid item sm={12} xs={12} key={`${Object.keys(proj)}-grid`}>
                            <Typography
                              key={Object.keys(proj)}
                              fontStyle="italic"
                              className={classes.projTitle}
                              variant="subtitle2"
                              gutterBottom
                            >
                              {Object.keys(proj)}
                            </Typography>
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              className={classes.input}
                              key={`${Object.keys(proj)}-name`}
                              fullWidth
                              variant="outlined"
                              label="Name"
                              defaultValue={Object.keys(proj)}
                              onBlur={e =>
                                changeProjectName(e.target.value, indexProj, Object.keys(proj))
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
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
                                  setSingleFieldProject(
                                    e.target.value,
                                    proj,
                                    '$description',
                                    indexProj,
                                  ),
                                )
                              }
                            />
                          </Grid>
                          <>
                            {proj[Object.keys(proj)]['Team'] ? (
                              <Grid item sm={6} xs={12}>
                                <TextField
                                  type="number"
                                  fullWidth
                                  key={proj[Object.keys(proj)]['Team']}
                                  className={classes.input}
                                  label="Team"
                                  variant="outlined"
                                  defaultValue={splitValue(proj)}
                                  onBlur={e =>
                                    setSingleFieldProject(+e.target.value, proj, 'Team', indexProj)
                                  }
                                />
                              </Grid>
                            ) : null}
                          </>
                          <Grid item sm={proj[Object.keys(proj)]['Team'] ? 6 : 12} xs={12}>
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
                          </Grid>
                          <Grid item xs={12}>
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
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <Typography>
                              Responsibilities
                              <Tooltip
                                element={'span'}
                                placement="right"
                                title={
                                  disablebAddField(proj[Object.keys(proj)]['Responsibilities']) ? (
                                    <span style={{ fontSize: '22px' }}>
                                      Please fill all input fields
                                    </span>
                                  ) : (
                                    ''
                                  )
                                }
                              >
                                <span>
                                  <IconButton
                                    disabled={disablebAddField(
                                      proj[Object.keys(proj)]['Responsibilities'],
                                    )}
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
                            <Grid item sm={12} xs={12} key={res}>
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
                                      onClick={() =>
                                        removeFieldResponsibility(proj, index, indexProj)
                                      }
                                    >
                                      <RemoveCircleOutlineIcon />
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                            </Grid>
                          ))}
                          <Button
                            title={`Remove project ${Object.keys(proj)}`}
                            variant="contained"
                            color="secondary"
                            onClick={() => removeProject(indexProj)}
                            endIcon={<DeleteIcon />}
                          >
                            {`Remove project ${Object.keys(proj)}`}
                          </Button>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
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
