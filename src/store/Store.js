import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useLocalObservable } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { set } from 'lodash';

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    resumeFields: {},
    userFields: {},
    sectionsFields: {},
    setUserData: () => {},
    setResumeFields: fields => {
      store.resumeFields = fields;
      store.userFields = fields.cv.$person;
      store.sectionsFields = fields.cv.$sections;
    },
    //user
    setUserField: (name, value) => {
      store.userFields[name] = value;
    },
    removeUserPhoto: () => {
      delete store.userFields['$photo'];
    },
    addUserPhoto: () => {
      store.userFields['$photo'] = '';
    },
    resetStore: () => {
      store.resumeFields = {};
      store.sectionsFields = {};
      store.userFields = {};
    },
    //section
    setSectionFieldSingleValue: (sectionKey, key, value) => {
      const updatedSection = set(store.sectionsFields[sectionKey], `${key}`, value);
      store.sectionsFields[sectionKey] = updatedSection;
    },
    setSectionStringField: (key, value) => {
      store.sectionsFields[key] = value;
    },
    setSectionFields: newSectionsValue => {
      store.sectionsFields = newSectionsValue;
    },

    setSectionFieldMultiValue: (key, index, value) => {
      store.sectionsFields[key][index] = value;
    },
    removeField: (key, index) => {
      store.sectionsFields[key].splice(index, 1);
    },
    addField: key => {
      store.sectionsFields[key].push('');
    },
    removeSection: name => {
      delete store.sectionsFields[name];
    },
    addNewSection: key => {
      store.sectionsFields[key] = [''];
    },
    changeSectionName: (oldName, newName) => {
      const newSectionsFields = Object.keys(store.sectionsFields).reduce(
        (keys, key) => ({
          ...keys,
          [key === oldName ? newName : key]: store.sectionsFields[key],
        }),
        {},
      );
      store.sectionsFields = newSectionsFields;
    },

    addFieldResponsibility: (proj, indexProj) => {
      const currentProj =
        store.sectionsFields['SIGNIFICANT PROJECTS'].$projects[indexProj][Object.keys(proj)];
      const newResponsibility = currentProj.Responsibilities.concat('');
      set(
        store.sectionsFields['SIGNIFICANT PROJECTS'],
        `$projects[${indexProj}].${Object.keys(proj)}.Responsibilities`,
        newResponsibility,
      );
      // store.sectionsFields['SIGNIFICANT PROJECTS'] = newProj ?
    },

    removeFieldResponsibility: (proj, index, indexProj) => {
      const currentProj =
        store.sectionsFields['SIGNIFICANT PROJECTS'].$projects[indexProj][Object.keys(proj)];
      const newResponsibility = currentProj.Responsibilities.filter((field, i) => i !== index);
      set(
        store.sectionsFields['SIGNIFICANT PROJECTS'],
        `$projects[${indexProj}].${Object.keys(proj)}.Responsibilities`,
        newResponsibility,
      );
    },
    setValueResponsibility: (value, proj, index, indexProj) => {
      const currentProj =
        store.sectionsFields['SIGNIFICANT PROJECTS'].$projects[indexProj][Object.keys(proj)];
      currentProj.Responsibilities[index] = value;
      set(
        store.sectionsFields['SIGNIFICANT PROJECTS'],
        `$projects[${indexProj}].${Object.keys(proj)}.Responsibilities`,
        currentProj.Responsibilities,
      );
    },
    addFieldToEducation: fields => {
      const education = store.sectionsFields['EDUCATION'].concat(fields);
      store.sectionsFields['EDUCATION'] = education;
    },
    removeFieldFromEducation: (institution, degree) => {
      const education = store.sectionsFields['EDUCATION'].filter(
        el => ![institution, degree].includes(el),
      );
      store.sectionsFields['EDUCATION'] = education;
    },
    updateFieldToEducation: fields => {
      store.sectionsFields['EDUCATION'] = fields;
    },
    //project section
    updateProjectField: (value, proj, fieldKey, indexProj) => {
      let updatedProjects = set(
        store.sectionsFields['SIGNIFICANT PROJECTS'],
        `$projects[${indexProj}].${Object.keys(proj)}.${fieldKey}`,
        value,
      );
      store.sectionsFields['SIGNIFICANT PROJECTS'] = updatedProjects;
    },
    createProject: project => {
      let updatedProjectList =
        store.sectionsFields['SIGNIFICANT PROJECTS'].$projects.concat(project);
      store.sectionsFields['SIGNIFICANT PROJECTS'] = { $projects: updatedProjectList };
    },
    changeProjectName: (name, projectIndex, oldName) => {
      const oldProjectList = toJS(store.sectionsFields['SIGNIFICANT PROJECTS'].$projects);
      const project = toJS(oldProjectList[projectIndex][oldName]);
      const updatedProjectList = oldProjectList.filter((proj, index) => index !== projectIndex);
      updatedProjectList.splice(projectIndex, 0, {
        [name]: project,
      });
      store.sectionsFields['SIGNIFICANT PROJECTS'] = { $projects: updatedProjectList };
    },
    removeProject: projectIndex => {
      const updatedProjectList = store.sectionsFields['SIGNIFICANT PROJECTS'].$projects.filter(
        (_, index) => index !== projectIndex,
      );
      store.sectionsFields['SIGNIFICANT PROJECTS'] = { $projects: updatedProjectList };
    },
    //tools section
    addTools: (key, value) => {
      store.sectionsFields['TOOLS & FRAMEWORKS'][key] = value;
    },
    removeTools: key => {
      delete store.sectionsFields['TOOLS & FRAMEWORKS'][key];
    },
  }));

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export { StoreProvider, StoreContext };

StoreProvider.propTypes = {
  children: PropTypes.object,
};
