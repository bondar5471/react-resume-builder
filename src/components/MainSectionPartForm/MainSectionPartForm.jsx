import React, { useState } from 'react';
import {
  Card,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './styles';
import { PropTypes } from 'prop-types';
import { handleInput } from '../../services/HandleInput';

import { disablebAddField } from '../../services/validationAddField';
import AddEducationInfo from '../AddEducationInfo/AddEducationInfo';
import EditEducationInfo from '../EditEducationInfo/EditEducationInfo';
import EducationForm from '../EducationForm/EducationForm';

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
  const [updatedIndex, setUpdatedIndex] = useState(null);
  const [educationArray, setEducationArray] = useState([]);
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('');
  const classes = useStyles();

  const handleCloseCreate = () => {
    setOpenEducationForm(false);
  };

  const handleCloseEdit = () => {
    setOpenEditForm(false);
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
                <EducationForm
                  value={value}
                  updateField={updateField}
                  removeFieldFromEducation={removeFieldFromEducation}
                />
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
            <AddEducationInfo
              openEducationForm={openEducationForm}
              handleCloseCreate={handleCloseCreate}
              addFieldToEducation={addFieldToEducation}
              institution={institution}
              degree={degree}
              setInstitution={setInstitution}
              setDegree={setDegree}
            />
            <EditEducationInfo
              openEditForm={openEditForm}
              handleCloseEdit={handleCloseEdit}
              editedField={editedField}
              handleUpdate={handleUpdate}
              setInstitution={setInstitution}
              setDegree={setDegree}
            />
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
