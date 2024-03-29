import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { debounce, set, assign } from 'lodash';
import { PropTypes } from 'prop-types';
import { Button, Card, Fab } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import HomeIcon from '@material-ui/icons/Home';
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
import { useHistory, useLocation } from 'react-router-dom';

export default function ResumeForm({ setResumeFields }) {
  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    window.addEventListener('beforeunload', e => beforeUnloadHandler(e));
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      window.removeEventListener('scroll', checkScrollTop);
    };
  });
  const beforeUnloadHandler = e => {
    e.preventDefault();
    e.returnValue = 'Close without saving?';
    window.onunload = function () {
      deleteResume();
    };
  };
  
  const { search } = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [showScroll, setShowScroll] = useState(false);
  const [userDataField, setUserDataField] = useStickyState(
    JSON.parse(localStorage.getItem('resumeFields')).cv.$person,
    'updatedUserState',
  );
  const [sectionsField, setSectionField] = useStickyState(
    JSON.parse(localStorage.getItem('resumeFields')).cv.$sections,
    'updatedSectionState',
  );
  const [globalError, setGlobalError] = useState(false);
  const [cancelEditFile, setCancelEditFile] = useState(false);
  const [openTsForm, setOpenTsForm] = useState(false);
  const [open, setOpen] = useState(false);

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
    const updatedSection = set(sectionsField[sectionKey], `${key}`, value);
    debounceSetSectionField({
      ...sectionsField,
      [sectionKey]: updatedSection,
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
    updateProjectField(indexProj, proj, fieldKey, value);
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
    setUserDataField(newState);
  };

  const deleteResume = () => {
    localStorage.removeItem('updatedUserState');
    localStorage.removeItem('resumeFields');
    localStorage.removeItem('updatedSectionState');
    localStorage.removeItem('currentSha');
    localStorage.removeItem('currentPath');
    setResumeFields(null);
    searchParams.delete('link');
    history.replace({ search: searchParams.toString() });
  };

  const resetChange = () => {
    const userData = JSON.parse(localStorage.getItem('resumeFields')).cv.$person;
    const sectionData = JSON.parse(localStorage.getItem('resumeFields')).cv.$sections;
    localStorage.setItem('updatedUserState', JSON.stringify(userData));
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

  const redirectToGitlab = () => {
    window.location.href = `${process.env.REACT_APP_GITLAB_URL}/cv/main/`;
    return null;
  };

  const currentPath = localStorage.getItem('currentPath');

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  useEffect(() => {
    if (currentPath && !searchParams.get('link')) {
      searchParams.set('link', currentPath);
      history.replace({ search: decodeURIComponent(searchParams) });
    }
  }, [searchParams]);


  return (
    <div>
      <form>
        <Button
          fullWidth
          className={classes.button}
          color="primary"
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => setCancelEditFile(true)}
        >
          Home
        </Button>
        <Card className={classes.section}>
          <UserForm
            setUserFieldValue={setUserFieldValue}
            userDataField={userDataField}
            setGlobalError={setGlobalError}
            setUserDataField={setUserDataField}
            currentPath={currentPath}
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
          setSectionField={setSectionField}
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
          setSectionField={setSectionField}
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
      <Button
        fullWidth
        startIcon={<ReplayIcon />}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => resetChange()}
      >
        Reset change
      </Button>
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
      <Button
        fullWidth
        onClick={() => redirectToGitlab()}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Go to gitlab
      </Button>
      <Button
        fullWidth
        color="inherit"
        variant="outlined"
        component={Link}
        to="/reorder-block"
        className={classes.button}
      >
        Reorder pdf block
      </Button>
    </div>
  );
}

ResumeForm.propTypes = {
  setResumeFields: PropTypes.func,
};
