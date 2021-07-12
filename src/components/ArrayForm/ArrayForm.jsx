import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { Tooltip, IconButton, Grid, TextField } from '@material-ui/core';
import { techStackOptions } from '../../template/techStackTemplates';
import { disabledAddField } from '../../services/validationAddField';
import { handleInput } from '../../services/HandleInput';
import EducationList from '../EducationList';
import { StoreContext } from '../../store/Store';
import { observer } from 'mobx-react-lite';
import { useStyles } from './styles';
import Section from '../shared/Section/Section';

const ArrayForm = observer(
  ({ setGlobalError, value, keyName, updateField, setOpenEducationForm, editSection }) => {
    const classes = useStyles();
    const store = React.useContext(StoreContext);
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

    const AddTooltip = (
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
              keyName === 'EDUCATION' ? setOpenEducationForm(true) : store.addField(keyName)
            }
          >
            <AddIcon />
          </IconButton>
        </span>
      </Tooltip>
    );

    const DeleteButton = (
      <IconButton
        color="secondary"
        title={`Remove section ${keyName}`}
        className={classes.removeSectionButton}
        onClick={() => store.removeSection(keyName)}
      >
        <DeleteSweepIcon color="secondary" />
      </IconButton>
    );

    const EditButton = (
      <>
        {keyName !== 'EDUCATION' && (
          <IconButton variant="contained" onClick={() => editSection(keyName)}>
            <EditIcon />
          </IconButton>
        )}
      </>
    );

    return (
      <Section
        className={classes.section}
        title={keyName}
        AddTooltip={AddTooltip}
        DeleteButton={DeleteButton}
        EditButton={EditButton}
      >
        <>
          {keyName === 'EDUCATION' ? (
            <EducationList value={value} updateField={updateField} />
          ) : (
            <Grid container spacing={2} justify="flex-start">
              {value.map((field, index) => (
                <Grid item xs={12} key={`${index}-box`}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item style={{ width: '95%' }}>
                      <Tooltip title={setTooltips(keyName)}>
                        <Autocomplete
                          onInputChange={(event, newValue) => {
                            handleInput(
                              setGlobalError,
                              newValue,
                              //store.setSectionFieldMultiValue(keyName, index, newValue),
                            );
                          }}
                          freeSolo
                          value={field}
                          options={techStackOptions[keyName] || []}
                          renderInput={params => <TextField {...params} variant="outlined" />}
                        />
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <IconButton
                        variant="contained"
                        color="secondary"
                        onClick={() => store.removeField(keyName, index)}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      </Section>
    );
  },
);

export default ArrayForm;
