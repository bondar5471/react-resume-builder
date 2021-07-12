import React, { useState } from 'react';
import { Card, Grid, IconButton, TextField, Tooltip } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { useStyles } from './styles';
import { PropTypes } from 'prop-types';
import { handleInput } from '../../services/HandleInput';

import AddEducationInfo from '../AddEducationInfo/AddEducationInfo';
import EditEducationInfo from '../EditEducationInfo/EditEducationInfo';
import UpdateSectionName from '../UpdateSectionName';
import { StoreContext } from '../../store/Store';
import { observer } from 'mobx-react-lite';
import ArrayForm from '../ArrayForm';

const MainSectionPartForm = observer(({ setGlobalError }) => {
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

  const store = React.useContext(StoreContext);
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
    store.updateFieldToEducation(fields);
    setOpenEditForm(false);
    setEditedField([]);
  };

  const editSection = key => {
    setUpdateSectionNameModal(true);
    setOldSectionName(key);
  };

  const changeSectionName = newSectionName => {
    store.changeSectionName(oldSectionName, newSectionName);
    setUpdateSectionNameModal(false);
  };

  return (
    <>
      {Object.entries(store.sectionsFields).map(([key, value]) => (
        <React.Fragment key={key}>
          {Array.isArray(value) ? (
            <ArrayForm
              setGlobalError={setGlobalError}
              value={value}
              key={key}
              updateField={updateField}
              setOpenEducationForm={setOpenEditForm}
              editSection={editSection}
            />
          ) : (
            <>
              {typeof value === 'string' ? (
                <Card className={classes.section} key={key}>
                  <Tooltip title={key === 'ROLE' ? 'Ex.: Full-stack Ruby Developer' : ''}>
                    <Grid container>
                      <Grid item xs={11}>
                        <TextField
                          className={classes.marginBottom}
                          fullWidth
                          variant="outlined"
                          label={key}
                          defaultValue={value}
                          onChange={e =>
                            handleInput(
                              setGlobalError,
                              e.target.value,
                              store.setSectionStringField(key, e.target.value),
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          color="secondary"
                          title={`Remove section ${key}`}
                          className={classes.removeSectionButton}
                          onClick={() => store.removeSection(key)}
                        >
                          <DeleteSweepIcon color="secondary" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Tooltip>
                </Card>
              ) : null}
              <AddEducationInfo
                openEducationForm={openEducationForm}
                handleCloseCreate={handleCloseCreate}
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
});

export default MainSectionPartForm;

MainSectionPartForm.propTypes = {
  setGlobalError: PropTypes.func,
};
