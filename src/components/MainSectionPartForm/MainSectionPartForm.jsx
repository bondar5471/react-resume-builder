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
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './styles';
import { PropTypes } from 'prop-types';
import { handleInput } from '../../services/HandleInput';

import { disabledAddField } from '../../services/validationAddField';
import AddEducationInfo from '../AddEducationInfo/AddEducationInfo';
import EditEducationInfo from '../EditEducationInfo/EditEducationInfo';
import EducationList from '../EducationList';
import UpdateSectionName from '../UpdateSectionName';

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
  setSectionField,
}) {
  const [openEducationForm, setOpenEducationForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editedField, setEditedField] = useState([]);
  const [updatedIndex, setUpdatedIndex] = useState(null);
  const [educationArray, setEducationArray] = useState([]);
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('');
  const [updateSectionNameModal, setUpdateSectionNameModal] = useState(false);
  const [oldSectionName, setOldSectionName] = useState('');
  const classes = useStyles();

  const handleCloseCreate = () => {
    setOpenEducationForm(false);
    setEditedField([]);
  };

  const handleCloseEdit = () => {
    setOpenEditForm(false);
    setEditedField([]);
  };

  const updateField = (pair, key, education) => {
    setEditedField(pair);
    setUpdatedIndex(key);
    setEducationArray(education);
    setOpenEditForm(true);
  };

  const handleUpdate = (university, status) => {
    let updatedEducationArray = educationArray;
    updatedEducationArray[updatedIndex] = [university, status];
    const fields = [].concat.apply([], updatedEducationArray);
    updateFieldToEducation(fields);
    setOpenEditForm(false);
    setEditedField([]);
  };

  const removeSection = key => {
    const oldSections = sectionsField;
    delete sectionsField[key];
    setSectionField({ ...oldSections, ...sectionsField });
  };

  const setTooltips = field => {
    switch (field) {
      case 'TECHNICAL EXPERTISE':
        return 'Write about your experience (years, knowledge domains, technologies)';
      case 'COMMUNICATION':
        return 'Do not write categories such as upper-intermediate or elementary for describing English level.';
      default:
        return '';
    }
  };

  const editSection = key => {
    setUpdateSectionNameModal(true);
    setOldSectionName(key);
  };

  const changeSectionName = newSectionName => {
    let updatedObject = sectionsField;
    updatedObject = Object.keys(updatedObject).reduce(
      (keys, key) => ({
        ...keys,
        [key === oldSectionName ? newSectionName : key]: updatedObject[key],
      }),
      {},
    );
    setSectionField(updatedObject);
    setUpdateSectionNameModal(false);
  };

  return (
    <>
      {Object.entries(sectionsField).map(([key, value]) => (
        <React.Fragment key={key}>
          {Array.isArray(value) ? (
            <Card className={classes.section}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {key !== 'EDUCATION' ? (
                  <IconButton variant="contained" onClick={() => editSection(key)}>
                    <EditIcon />
                  </IconButton>
                ) : null}
                {key}
                <Tooltip
                  element={'span'}
                  title={
                    disabledAddField(value) ? (
                      <span style={{ fontSize: '22px' }}>Please fill all input fields</span>
                    ) : (
                      ''
                    )
                  }
                >
                  <span>
                    <IconButton
                      disabled={disabledAddField(value)}
                      variant="contained"
                      onClick={() =>
                        key === 'EDUCATION' ? setOpenEducationForm(true) : addField(key)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <IconButton
                  color="secondary"
                  title={`Remove section ${key}`}
                  className={classes.removeSectionButton}
                  onClick={() => removeSection(key)}
                >
                  <DeleteSweepIcon color="secondary" />
                </IconButton>
              </Typography>
              <>
                {key === 'EDUCATION' ? (
                  <EducationList
                    value={value}
                    updateField={updateField}
                    removeFieldFromEducation={removeFieldFromEducation}
                  />
                ) : (
                  <Grid container spacing={2} justify="flex-start">
                    {value.map((field, index) => (
                      <Grid item xs={12} key={`${index}-box`}>
                        <Tooltip title={setTooltips(key)}>
                          <TextField
                            fullWidth
                            key={`${index}-field`}
                            defaultValue={field}
                            multiline
                            variant="outlined"
                            onChange={e => {
                              e.preventDefault();
                              handleInput(
                                setGlobalError,
                                e.target.value,
                                setSectionFieldMultiValue(e.target.value, key, index),
                              );
                            }}
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
                        </Tooltip>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            </Card>
          ) : (
            <>
              {typeof value === 'string' ? (
                <Card className={classes.section} key={key}>
                  <Tooltip title={key === 'ROLE' ? 'Ex.: Full-stack Ruby Developer' : ''}>
                    <TextField
                      className={classes.marginBottom}
                      fullWidth
                      variant="outlined"
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
                  </Tooltip>
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
          )}
        </React.Fragment>
      ))}
      <UpdateSectionName
        changeSectionName={changeSectionName}
        open={updateSectionNameModal}
        setUpdateSectionNameModal={setUpdateSectionNameModal}
        oldSectionName={oldSectionName}
      />
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
  setSectionField: PropTypes.func,
};
