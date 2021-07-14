import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Tooltip, IconButton, Grid, TextField } from '@material-ui/core';
import { techStackOptions } from '../../template/techStackTemplates';
import { handleInput } from '../../services/HandleInput';
import EducationList from '../EducationList';
import { StoreContext } from '../../store/Store';
import { observer } from 'mobx-react-lite';
import { useStyles } from './styles';
import Section from '../shared/Section/Section';
import AddTooltip from '../shared/AddTooltip/AddTooltip';
import DeleteButton from '../shared/DeleteButtont/DeleteButton';
import EditButton from '../shared/EditButton/EditButton';

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

    // const AddTooltipButton = <AddTooltip value={value} keyName={keyName} setOpenEducationForm={setOpenEducationForm} />;
    // const DeleteSectionButton =  <DeleteButton sectionName={keyName}/>;
    // const EditSectionButton = (
    //   <>
    //     {keyName !== 'EDUCATION' && <EditButton editSection={editSection} sectionName={keyName} />}
    //   </>
    // );

    return (
      <Section
        className={classes.section}
        title={keyName}
        // AddTooltip={AddTooltipButton}
        // DeleteButton={DeleteSectionButton}
        // EditButton={EditSectionButton}
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
