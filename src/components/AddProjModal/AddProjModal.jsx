import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Tooltip,
  Paper,
  IconButton,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import omit from 'lodash/omit';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { projectResponsibility } from '../../template/projectResponsibility';
import { useStyles } from './styles';

export default function AddProjModal({ handleClose, open, createProject }) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState(['']);
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');
  const [team, setTeam] = useState('');

  const handleChangeRes = (value, index) => {
    const updatedData = responsibilities;
    updatedData[index] = value;
    setResponsibilities(updatedData);
  };

  const newProject = () => {
    let project = {
      [`${name}`]: {
        $description: description,
        Team: team,
        Role: role,
        Skills: skills,
        Responsibilities: responsibilities,
      },
    };
    if (team === '') {
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
              className={classes.textField}
              variant="filled"
              label="Project name"
              required
              onBlur={e => setName(e.target.value)}
            />
            <Tooltip title="Shortly describe a project. Include product category, target users, and primary features.">
              <TextField
                fullWidth
                className={classes.textField}
                variant="filled"
                multiline
                rows={3}
                label="Description"
                required
                onBlur={e => setDescription(e.target.value)}
              />
            </Tooltip>
            <Paper className={classes.responsibilitiesBlock}>
              <Typography className={classes.label}>Responsibilities</Typography>
              <Tooltip title="Add new field">
                <IconButton
                  color="primary"
                  onClick={() => setResponsibilities([...responsibilities, ''])}
                >
                  <ControlPointIcon />
                </IconButton>
              </Tooltip>
              {responsibilities.map((res, index) => (
                <Autocomplete
                  key={`res-${index}`}
                  className={classes.textField}
                  onInputChange={(event, newValue) => handleChangeRes(newValue, index)}
                  freeSolo
                  value={res}
                  options={projectResponsibility}
                  renderInput={params => <TextField {...params} variant="outlined" />}
                />
              ))}
            </Paper>
            <Tooltip title="Ex.: Full-stack Developer">
              <TextField
                className={classes.textField}
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
                className={classes.textField}
                variant="filled"
                label="Skills"
                required
                onBlur={e => setSkills(e.target.value)}
              />
            </Tooltip>
            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              label="Team info"
              onBlur={e => setTeam(e.target.value)}
            />
            <DialogActions>
              <Button color="default" variant="contained" autoFocus type="submit">
                Add
              </Button>
              <Button onClick={handleClose} color="secondary" variant="contained">
                Cancel
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
