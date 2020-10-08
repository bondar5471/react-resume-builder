import React, { useState } from 'react';
import {
  Card,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  DialogContent,
  Button,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import chunk from 'lodash/chunk';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './styles';
import { PropTypes } from 'prop-types';
import { handleInput } from '../../services/HandleInput';

import { disablebAddField } from '../../services/validationAddField';

export default function MainSectionPartForm({
  sectionsField,
  setSectionFieldMultiValue,
  setSectionFieldSingleValue,
  removeField,
  addField,
  addFieldToEducation,
  removeFieldFromEducation,
  updateFieldToEducation,
  setGlobalError,
}) {
  const [openEducationForm, setOpenEducationForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editedField, setEditedFied] = useState([]);
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('');
  const [updatedIndex, setUpdatedIndex] = useState(null);
  const [educationArray, setEducationArray] = useState([]);
  const classes = useStyles();

  const handleCloseCreate = () => {
    setOpenEducationForm(false);
  };

  const handleCloseEdit = () => {
    setOpenEditForm(false);
  };

  const splitArray = value => {
    const splitedArray = chunk(value, 2);
    return splitedArray;
  };

  const updateField = (pair, key, education) => {
    setEditedFied(pair);
    setUpdatedIndex(key);
    setEducationArray(education);
    setOpenEditForm(true);
  };

  const handleUpdate = () => {
    let updatedEducationArray = educationArray;
    updatedEducationArray[updatedIndex] = [institution, degree];
    const fields = [].concat.apply([], updatedEducationArray);
    updateFieldToEducation(fields);
    setOpenEditForm(false);
  };

  return (
    <>
      {Object.entries(sectionsField).map(([key, value]) =>
        Array.isArray(value) ? (
          <Card className={classes.section} key={key}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {key}
              <Tooltip
                element={'span'}
                title={
                  disablebAddField(value) ? (
                    <span style={{ fontSize: '22px' }}>Please fill all input fields</span>
                  ) : (
                    ''
                  )
                }
              >
                <span>
                  <IconButton
                    disabled={disablebAddField(value)}
                    variant="contained"
                    onClick={() =>
                      key === 'EDUCATION' ? setOpenEducationForm(true) : addField(key)
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Typography>
            <>
              {key === 'EDUCATION' ? (
                <List component="nav">
                  <Grid container spacing={2} justify="flex-start">
                    {splitArray(value).map((pair, index) => (
                      <Grid item xs={12} key={index} className={classes.educationContainer}>
                        <ListItem
                          button
                          onClick={() => updateField(pair, index, splitArray(value))}
                        >
                          <ListItemText
                            primary={
                              <React.Fragment>
                                <Typography key={`${pair[0]}-institution`}>
                                  Educational institution: {pair[0]}
                                </Typography>
                                <Typography key={`${pair[1]}-degree`}>Degree: {pair[1]}</Typography>
                              </React.Fragment>
                            }
                          />
                          <ListItemSecondaryAction>
                            <InputAdornment position="end">
                              <IconButton
                                variant="contained"
                                color="secondary"
                                onClick={() => removeFieldFromEducation(pair[0], pair[1])}
                              >
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            </InputAdornment>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </Grid>
                    ))}
                  </Grid>
                </List>
              ) : (
                <Grid container spacing={2} justify="flex-start">
                  {value.map((field, index) => (
                    <Grid item xs={12} key={`${field}-section`}>
                      <TextField
                        fullWidth
                        key={`${field}-field`}
                        defaultValue={field}
                        multiline
                        variant="outlined"
                        onBlur={e =>
                          handleInput(
                            setGlobalError,
                            e.target.value,
                            setSectionFieldMultiValue(e.target.value, key, index),
                          )
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                variant="contained"
                                color="secondary"
                                onClick={() => removeField(index, key)}
                              >
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          </Card>
        ) : (
          <>
            {typeof value === 'string' ? (
              <Card className={classes.section} key={value}>
                <TextField
                  className={classes.marginBottom}
                  fullWidth
                  variant="outlined"
                  id="filled-basic"
                  label={key}
                  defaultValue={value}
                  onBlur={e =>
                    handleInput(
                      setGlobalError,
                      e.target.value,
                      setSectionFieldSingleValue(e.target.value, key),
                    )
                  }
                />
              </Card>
            ) : null}
            <Dialog
              open={openEducationForm}
              onClose={handleCloseCreate}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{'Add education information'}</DialogTitle>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addFieldToEducation([institution, degree]);
                  handleCloseCreate();
                }}
              >
                <DialogContent>
                  <TextField
                    required
                    className={classes.marginBottom}
                    fullWidth
                    variant="outlined"
                    id="filled-basic"
                    label="Educational institution"
                    onBlur={e => setInstitution(e.target.value)}
                  />
                  <TextField
                    required
                    className={classes.marginBottom}
                    fullWidth
                    variant="outlined"
                    id="filled-basic"
                    label="Degree"
                    onBlur={e => setDegree(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseCreate}>Cancel</Button>
                  <Button type="submit">Add</Button>
                </DialogActions>
              </form>
            </Dialog>
            <Dialog
              open={openEditForm}
              onClose={handleCloseEdit}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{'Add education information'}</DialogTitle>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleUpdate();
                }}
              >
                <DialogContent>
                  <TextField
                    required
                    className={classes.marginBottom}
                    fullWidth
                    variant="outlined"
                    id="filled-basic"
                    label="Educational institution"
                    defaultValue={editedField[0]}
                    onBlur={e => setInstitution(e.target.value)}
                  />
                  <TextField
                    required
                    className={classes.marginBottom}
                    fullWidth
                    variant="outlined"
                    id="filled-basic"
                    label="Degree"
                    defaultValue={editedField[1]}
                    onBlur={e => setDegree(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseEdit}>Cancel</Button>
                  <Button type="submit">Edit</Button>
                </DialogActions>
              </form>
            </Dialog>
          </>
        ),
      )}
    </>
  );
}

MainSectionPartForm.propTypes = {
  sectionsField: PropTypes.object,
  setSectionFieldSingleValue: PropTypes.func,
  setSectionFieldMultiValue: PropTypes.func,
  removeField: PropTypes.func,
  addField: PropTypes.func,
  addFieldToEducation: PropTypes.func,
  removeFieldFromEducation: PropTypes.func,
  updateFieldToEducation: PropTypes.func,
  setGlobalError: PropTypes.func,
};
