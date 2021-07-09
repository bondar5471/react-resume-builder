import React, { useState, useContext } from 'react';
import {
  Typography,
  InputAdornment,
  IconButton,
  Grid,
  InputLabel,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Snackbar,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './styles';
import Card from '@material-ui/core/Card';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { handleInput } from '../../services/HandleInput';
import { observer } from 'mobx-react-lite';

import { StoreContext } from '../../store/Store';
import Alert from '../Alert';
import ProjectsForm from '../ProjectsForm/ProjectsForm';

const SecondarySectionPartForm = observer(({ handleOpenTsForm, setGlobalError, handleOpen }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [sectionArrayName, setSectionArrayName] = useState('');
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const store = useContext(StoreContext);
  const { sectionsFields } = store;

  const setSingleObjectField = (sectionKey, key, value) => {
    store.setSectionFieldSingleValue(sectionKey, key, value);
  };

  const removeTools = key => {
    store.removeTools(key);
  };

  const classes = useStyles();
  const isObject = arg => {
    return !!arg && arg.constructor === Object;
  };

  const addNewSectionList = () => {
    const emptyName = /^ *$/.test(sectionArrayName);
    const alreadyExist = Object.keys(sectionsFields).indexOf(sectionArrayName) > -1;
    if (emptyName || alreadyExist) {
      setOpenErrorAlert(true);
    } else {
      store.addNewSection(sectionArrayName);
      setOpenAlert(true);
      setSectionArrayName('');
    }
  };

  const sectionNameValidation = () => {
    let isNum = /^\d+$/.test(sectionArrayName);
    return !sectionArrayName.replace(/\s/g, '').length || sectionArrayName === '' || isNum;
  };

  return (
    <>
      {Object.entries(store.sectionsFields).map(
        ([key, value]) =>
          isObject(value) && (
            <Card className={classes.section} key={key}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {key}
                <IconButton
                  onClick={key === 'SIGNIFICANT PROJECTS' ? handleOpen : handleOpenTsForm}
                >
                  <AddIcon />
                </IconButton>
              </Typography>
              <Grid container spacing={2} justify="flex-start">
                {Object.entries(value).map(([label, defaultValue]) => (
                  <React.Fragment key={label}>
                    {label === '$projects' ? (
                      <ProjectsForm defaultValue={defaultValue} setGlobalError={setGlobalError} />
                    ) : (
                      <Grid item sm={6} xs={12} key={`${defaultValue}-grid`}>
                        <InputLabel htmlFor={`${label}-component-outlined`}>
                          <Typography variant="subtitle2">{label}</Typography>
                        </InputLabel>
                        <Tooltip title="Add tools separated by commas">
                          <OutlinedInput
                            id={`${label}-component-outlined`}
                            className={classes.input}
                            key={`${defaultValue}-input`}
                            variant="outlined"
                            defaultValue={defaultValue}
                            onBlur={e =>
                              handleInput(
                                setGlobalError,
                                e.target.value,
                                setSingleObjectField(key, label, e.target.value),
                              )
                            }
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => removeTools(label)}
                                >
                                  <RemoveCircleOutlineIcon />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </Tooltip>
                      </Grid>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
            </Card>
          ),
      )}
      <Card className={classes.addSectionAccordion}>
        <Accordion>
          <AccordionSummary
            color="secondary"
            className={classes.accordionTitle}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="add-sections-content"
          >
            <Typography>Create custom section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              label="Section name"
              variant="outlined"
              value={sectionArrayName}
              helperText="The name must not contain only spaces (ie. spaces, tabs or line breaks), be empty and contain only numbers."
              onChange={e => setSectionArrayName(e.target.value)}
            />
            <Button
              disabled={sectionNameValidation()}
              className={classes.createButton}
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => addNewSectionList()}
            >
              Create
            </Button>
          </AccordionDetails>
        </Accordion>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
          <Alert onClose={() => setOpenAlert(false)} severity="success">
            Created successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openErrorAlert}
          autoHideDuration={6000}
          onClose={() => setOpenErrorAlert(false)}
        >
          <Alert onClose={() => setOpenErrorAlert(false)} severity="error">
            Section already exists!
          </Alert>
        </Snackbar>
      </Card>
    </>
  );
});

export default SecondarySectionPartForm;
