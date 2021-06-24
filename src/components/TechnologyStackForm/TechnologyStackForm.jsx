import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Chip } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { observer } from 'mobx-react-lite';

import { stackSelector } from './helpers';
import { useStyles } from './styles';
import { StoreContext } from '../../store/Store';

const TechnologyStackForm = observer(({ handleCloseTsForm, openTsForm }) => {
  const classes = useStyles();
  const store = useContext(StoreContext);
  const [category, setCategory] = useState('Programming Languages');
  const [stack, setStack] = useState([]);

  const addTools = (key, value) => {
    store.addTools(key, value);
  };

  const addFieldTs = () => {
    addTools(category, stack);
    handleCloseTsForm();
  };

  const options = [
    'Programming Languages',
    'Ruby',
    'JavaScript',
    'PHP',
    'Testing Tools',
    'Databases',
    'Responsive design',
    'CSS',
    'Version Control Systems',
    'Virtualization',
    'Cloud Platforms',
    'Tools',
  ];

  const setStackList = (event, value) => {
    event.preventDefault();
    const stackList = value.join(', ');
    setStack(stackList);
  };

  return (
    <div>
      <Dialog
        open={openTsForm}
        onClose={handleCloseTsForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth={'lg'}
      >
        <DialogTitle id="alert-dialog-title">Add new category</DialogTitle>
        <DialogContent>
          <Autocomplete
            className={classes.textField}
            freeSolo
            value={category}
            options={options.map(option => option)}
            onInputChange={(event, newValue) => {
              setCategory(newValue);
            }}
            renderInput={params => <TextField {...params} label="Category" variant="outlined" />}
          />
          <Autocomplete
            disabled={category === ''}
            className={classes.textField}
            multiple
            options={stackSelector(category)}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip key={option} variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            onInputChange={e => setStack(e.target.value)}
            onChange={(event, value) => {
              setStackList(event, value);
            }}
            renderInput={params => <TextField {...params} variant="filled" label="Stack" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => addFieldTs()} variant="contained" autoFocus>
            Add
          </Button>
          <Button onClick={handleCloseTsForm} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
export default TechnologyStackForm;

TechnologyStackForm.propTypes = {
  handleCloseTsForm: PropTypes.func,
  openTsForm: PropTypes.bool,
};
