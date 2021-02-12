import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Tooltip,
} from '@material-ui/core';
import omit from 'lodash/omit';
import AddIcon from '@material-ui/icons/Add';

import { useStyles } from './styles';

export default function AddProjModal({ handleClose, open, createProject }) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState(['']);
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');
  const [team, setTeam] = useState(0);

  const handleChangeRes = (value, index) => {
    const updatedData = responsibilities;
    updatedData[index] = value;
    setResponsibilities(updatedData);
  };

  const newProject = () => {
    let project = {
      [`${name}`]: {
        $description: description,
        Team: `${team} people`,
        Role: role,
        Skills: skills,
        Responsibilities: responsibilities,
      },
    };
    if (team === 0 || team === '') {
      const projectInfo = omit(project[name], ['Team']);
      createProject({ [name]: projectInfo });
      handleClose();
    } else {
      createProject(project);
      handleClose();
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Add project information'}</DialogTitle>
        <DialogContent>
          <form
            className={classes.form}
            onSubmit={e => {
              e.preventDefault();
              newProject();
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              label="Project name"
              required
              onBlur={e => setName(e.target.value)}
            />
            <Tooltip title="Shortly describe a project. Include product category, target users, and primary features.">
              <TextField
                fullWidth
                variant="filled"
                multiline
                rows={3}
                label="Description"
                required
                onBlur={e => setDescription(e.target.value)}
              />
            </Tooltip>
            <Typography align="center">Responsibilities:</Typography>
            {responsibilities.map((res, index) => (
              <Tooltip
                key={res}
                title="Add all activities on this project, ex.: Backend development, Code review and optimization."
              >
                <TextField
                  key={index}
                  fullWidth
                  variant="filled"
                  defaultValue={res}
                  required
                  onBlur={e => handleChangeRes(e.target.value, index)}
                />
              </Tooltip>
            ))}
            <Tooltip title="Add new field">
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => setResponsibilities([...responsibilities, ''])}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Ex.: Full-stack Developer">
              <TextField
                fullWidth
                variant="filled"
                label="Role"
                required
                onBlur={e => setRole(e.target.value)}
              />
            </Tooltip>
            <Tooltip title="Add all skills on technologies used in this project, such as programming language, database, and others.">
              <TextField
                fullWidth
                variant="filled"
                label="Skills"
                required
                onBlur={e => setSkills(e.target.value)}
              />
            </Tooltip>
            <TextField
              fullWidth
              variant="filled"
              label="Team info"
              type="number"
              onBlur={e => setTeam(+e.target.value)}
            />
            <DialogActions>
              <Button onClick={handleClose} variant="contained">
                Cancel
              </Button>
              <Button variant="contained" autoFocus type="submit">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

AddProjModal.propTypes = {
  createProject: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};
