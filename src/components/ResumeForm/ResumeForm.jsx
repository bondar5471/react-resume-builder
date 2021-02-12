import React, { useState, useEffect } from 'react';
import { debounce, set, assign } from 'lodash';
import { PropTypes } from 'prop-types';
import { Button, ButtonGroup, Card, Fab } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import DescriptionIcon from '@material-ui/icons/Description';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { useStyles } from './styles';
import WriteResumeFile from '../WriteResumeFile';
import AddProjModal from '../AddProjModal';
import TechnologyStackForm from '../TechnologyStackForm';
import SecondarySectionPartForm from '../SecondarySectionPartForm';
import MainSectionPartForm from '../MainSectionPartForm';
import UserForm from '../UserForm';
import ResetFileAlert from '../ResetFileAlert';
import { useStickyState } from '../../services/StickyState';

export default function ResumeForm({ setResumeFields }) {
  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = 'Close without saving?';
      window.onunload = function () {
        localStorage.clear();
      };
    });
    return () => {
      window.removeEventListener('beforeunload');
      window.removeEventListener('scroll');
    };
  }, []);
  const classes = useStyles();
  const [showScroll, setShowScroll] = useState(false);
  const [userDataField, setUserDataField] = useStickyState(
    JSON.parse(localStorage.getItem('resumeFields')).cv.$person,
    'udpdatedUserState',
  );
  const [sectionsField, setSectionField] = useStickyState(
    JSON.parse(localStorage.getItem('resumeFields')).cv.$sections,
    'updatedSectionState',
  );
  const [globalError, setGlobalError] = useState(false);
  const [cancelEditFile, setCancelEditFile] = useState(false);
  const [openTsForm, setOpenTsForm] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceSetUserDataField = React.useRef(debounce(state => setUserDataField(state), 100))
    .current;
  const debounceSetSectionField = React.useRef(debounce(state => setSectionField(state), 100))
    .current;
  const projectSectionField = sectionsField['SIGNIFICANT PROJECTS'];

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 200) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenTsForm = () => {
    setOpenTsForm(true);
  };

  const handleCloseTsForm = () => {
    setOpenTsForm(false);
  };

  const closeCancelEditFile = () => {
    setCancelEditFile(false);
  };

  const addField = key => {
    const oldField = sectionsField[key];
    setSectionField({ ...sectionsField, [key]: oldField.concat('') });
  };

  const removeField = (index, key) => {
    const oldField = sectionsField[key];
    const newField = oldField.filter((field, i) => i !== index);
    setSectionField({ ...sectionsField, [key]: newField });
  };

  const setSingleObjectField = (value, sectionKey, key) => {
    const updatetSection = set(sectionsField[sectionKey], `${key}`, value);
    debounceSetSectionField({
      ...sectionsField,
      [sectionKey]: updatetSection,
    });
  };

  const addFieldResponsibility = (proj, indexProj) => {
    const currentProj = projectSectionField.$projects[indexProj][Object.keys(proj)];
    const newResponsibility = currentProj.Responsibilities.concat('');
    const newProj = set(
      projectSectionField,
      `$projects[${indexProj}].${Object.keys(proj)}.Responsibilities`,
      newResponsibility,
    );
    setSectionField({
      ...sectionsField,
      ['SIGNIFICANT PROJECTS']: newProj,
    });
  };

  const removeFieldResponsibility = (proj, index, indexProj) => {
    const currentProj = projectSectionField.$projects[indexProj][Object.keys(proj)];
    const newResponsibility = currentProj.Responsibilities.filter((field, i) => i !== index);
    const newProj = set(
      projectSectionField,
      `$projects[${indexProj}].${Object.keys(proj)}.Responsibilities`,
      newResponsibility,
    );
    setSectionField({
      ...sectionsField,
      ['SIGNIFICANT PROJECTS']: newProj,
    });
  };

  const setValueResponsibility = (value, proj, index, indexProj) => {
    const currentProj = projectSectionField.$projects[indexProj][Object.keys(proj)];
    currentProj.Responsibilities[index] = value;
    const newProj = set(
      projectSectionField,
      `$projects[${indexProj}].${Object.keys(proj)}.Responsibilities`,
      currentProj.Responsibilities,
    );
    debounceSetSectionField({
      ...sectionsField,
      ['SIGNIFICANT PROJECTS']: newProj,
    });
  };

  const updateTeamInformation = (value, indexProj, proj, fieldKey) => {
    let updatedProject;
    if (value === 0) {
      const updatedProjectList = projectSectionField.$projects;
      updatedProject = projectSectionField.$projects[`${indexProj}`][Object.keys(proj)];

      delete updatedProject[fieldKey];
      updatedProjectList.splice(indexProj, 1, {
        [Object.keys(proj)]: updatedProject,
      });
      debounceSetSectionField({
        ...sectionsField,
        ['SIGNIFICANT PROJECTS']: { $projects: updatedProjectList },
      });
    } else {
      const team = `${value} people`;
      updateProjectField(indexProj, proj, fieldKey, team);
    }
  };

  const updateProjectField = (indexProj, proj, fieldKey, value) => {
    const updatedProject = set(
      projectSectionField,
      `$projects[${indexProj}].${Object.keys(proj)}.${fieldKey}`,
      value,
    );
    debounceSetSectionField({
      ...sectionsField,
      ['SIGNIFICANT PROJECTS']: updatedProject,
    });
  };

  const setSingleFieldProject = (value, proj, fieldKey, indexProj) => {
    if (typeof value === 'number') {
      updateTeamInformation(value, indexProj, proj, fieldKey);
    } else {
      updateProjectField(indexProj, proj, fieldKey, value);
    }
  };

  const createProject = project => {
    const updatedProjList = projectSectionField.$projects.concat(project);
    setSectionField({
      ...sectionsField,
      ['SIGNIFICANT PROJECTS']: { $projects: updatedProjList },
    });
  };

  const changeProjectName = (name, projectIndex, oldName) => {
    const updatedProjList = projectSectionField.$projects;
    const projectInfo = updatedProjList[projectIndex][oldName];
    const projectList = updatedProjList.filter((proj, index) => index !== projectIndex);
    projectList.splice(projectIndex, 0, {
      [name]: projectInfo,
    });
    setSectionField({
      ...sectionsField,
      ['SIGNIFICANT PROJECTS']: { $projects: projectList },
    });
  };

  const removeProject = key => {
    const updatedProjList = projectSectionField.$projects;
    setSectionField({
      ...sectionsField,
      ['SIGNIFICANT PROJECTS']: {
        $projects: updatedProjList.filter((proj, index) => index !== key),
      },
    });
  };

  const addTools = data => {
    setSectionField({
      ...sectionsField,
      ['TOOLS & FRAMEWORKS']: assign(sectionsField['TOOLS & FRAMEWORKS'], data),
    });
  };

  const removeTools = key => {
    const updatedFields = sectionsField['TOOLS & FRAMEWORKS'];
    delete updatedFields[key];
    setSectionField({
      ...sectionsField,
      ['TOOLS & FRAMEWORKS']: updatedFields,
    });
  };

  const setSectionFieldMultiValue = (value, key, index) => {
    const updatedField = sectionsField[key];
    updatedField[index] = value;
    debounceSetSectionField({ ...sectionsField, [key]: updatedField });
  };

  const setSectionFieldSingleValue = (value, key) => {
    debounceSetSectionField({ ...sectionsField, [key]: value });
  };

  const setUserFieldValue = (value, key) => {
    const updatedState = userDataField;
    const newState = { ...updatedState, [key]: value };
    debounceSetUserDataField(newState);
  };

  const deleteResume = () => {
    localStorage.clear();
    setResumeFields(null);
  };

  const resetChange = () => {
    const userData = JSON.parse(localStorage.getItem('resumeFields')).cv.$person;
    const sectionData = JSON.parse(localStorage.getItem('resumeFields')).cv.$sections;
    localStorage.setItem('udpdatedUserState', JSON.stringify(userData));
    localStorage.setItem('updatedSectionState', JSON.stringify(sectionData));
    setGlobalError(false);
    setUserDataField(userData);
    setSectionField(sectionData);
  };

  const addFieldToEducation = fields => {
    const updatedField = sectionsField['EDUCATION'];
    const newState = updatedField.concat(fields);
    debounceSetSectionField({ ...sectionsField, ['EDUCATION']: newState });
  };

  const removeFieldFromEducation = (institution, degree) => {
    const updatedField = sectionsField['EDUCATION'];
    const valuesToRemove = [institution, degree];
    const newState = updatedField.filter(el => !valuesToRemove.includes(el));
    debounceSetSectionField({ ...sectionsField, ['EDUCATION']: newState });
  };

  const updateFieldToEducation = fields => {
    debounceSetSectionField({ ...sectionsField, ['EDUCATION']: fields });
  };

  return (
    <div className={classes.main}>
      <form>
        <ButtonGroup fullWidth disableElevation>
          <Button color="secondary" variant="contained" onClick={() => setCancelEditFile(true)}>
            Choose another file
            <DescriptionIcon />
          </Button>
          <Button variant="contained" color="default" onClick={() => resetChange()}>
            Reset change
            <ReplayIcon />
          </Button>
        </ButtonGroup>
        <Card className={classes.section}>
          <UserForm
            setUserFieldValue={setUserFieldValue}
            userDataField={userDataField}
            setGlobalError={setGlobalError}
          />
        </Card>
        <MainSectionPartForm
          sectionsField={sectionsField}
          setSectionFieldMultiValue={setSectionFieldMultiValue}
          setSectionFieldSingleValue={setSectionFieldSingleValue}
          addField={addField}
          removeField={removeField}
          addFieldToEducation={addFieldToEducation}
          removeFieldFromEducation={removeFieldFromEducation}
          updateFieldToEducation={updateFieldToEducation}
          setGlobalError={setGlobalError}
        />
        <SecondarySectionPartForm
          handleOpen={handleOpen}
          sectionsField={sectionsField}
          setValueResponsibility={setValueResponsibility}
          removeFieldResponsibility={removeFieldResponsibility}
          addFieldResponsibility={addFieldResponsibility}
          setSingleObjectField={setSingleObjectField}
          removeTools={removeTools}
          handleOpenTsForm={handleOpenTsForm}
          setSingleFieldProject={setSingleFieldProject}
          removeProject={removeProject}
          setGlobalError={setGlobalError}
          changeProjectName={changeProjectName}
        />
      </form>
      <WriteResumeFile
        userData={userDataField}
        sectionData={sectionsField}
        globalError={globalError}
      />
      <AddProjModal handleClose={handleClose} open={open} createProject={createProject} />
      <TechnologyStackForm
        handleCloseTsForm={handleCloseTsForm}
        openTsForm={openTsForm}
        addTools={addTools}
      />
      <ResetFileAlert
        cancelEditFile={cancelEditFile}
        closeCancelEditFile={closeCancelEditFile}
        deleteResume={deleteResume}
      />
      {showScroll ? (
        <Fab
          color="primary"
          aria-label="Top"
          className={classes.scroll}
          onClick={() => scrollTop()}
        >
          <ArrowUpwardIcon />
        </Fab>
      ) : null}
    </div>
  );
}

ResumeForm.propTypes = {
  setResumeFields: PropTypes.func,
};
