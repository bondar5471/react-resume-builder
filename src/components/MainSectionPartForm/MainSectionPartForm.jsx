import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import AddEducationInfo from '../AddEducationInfo/AddEducationInfo';
import EditEducationInfo from '../EditEducationInfo/EditEducationInfo';
import UpdateSectionName from '../UpdateSectionName';
import { StoreContext } from '../../store/Store';
import { observer } from 'mobx-react-lite';
import ArrayForm from '../ArrayForm';
import SimpleForm from '../shared/SimpleForm/SimpleForm';

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
              keyName={key}
              updateField={updateField}
              setOpenEducationForm={setOpenEditForm}
              editSection={editSection}
            />
          ) : (
            <>
              {typeof value === 'string' && (
                <SimpleForm key={key} keyName={key} value={value} setGlobalError={setGlobalError} />
              )}
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
