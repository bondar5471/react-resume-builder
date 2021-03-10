import React, { useState } from 'react';
import { Grid, TextField, Typography, Tooltip, Button } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { handleInput } from '../../services/HandleInput';
import UploadAvatarModal from '../UploadAvatarModal';

import { useStyles } from './styles';
export default function UserForm({ setUserFieldValue, userDataField, setGlobalError }) {
  const [openUploadAvatarModal, setOpenUploadAvatarModal] = useState(false);

  const capitalizeLabel = label => {
    if (typeof label !== 'string') return '';
    const cutLabel = label.substring(1);
    const changedLabel = cutLabel.charAt(0).toUpperCase() + cutLabel.slice(1);
    return changedLabel;
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        PERSONAL DETAILS
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(userDataField).map(([key, value]) => (
          <Grid key={value} item sm={key === '$photo' ? 12 : 6} xs={12}>
            {key === '$photo' ? (
              <span>
                <Tooltip title="Specify the path to the file or upload file.">
                  <TextField
                    error={!value}
                    variant="outlined"
                    fullWidth
                    label="Photo"
                    defaultValue={value}
                    onBlur={e =>
                      handleInput(
                        setGlobalError,
                        e.target.value,
                        setUserFieldValue(e.target.value, key),
                      )
                    }
                    helperText={!value ? 'This field is required' : null}
                  />
                </Tooltip>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.uploadButton}
                  startIcon={<CloudUpload />}
                  onClick={() => setOpenUploadAvatarModal(true)}
                >
                  Set photo url from gitlab
                </Button>
              </span>
            ) : (
              <TextField
                error={!value}
                fullWidth
                key={key}
                variant="outlined"
                label={capitalizeLabel(key)}
                defaultValue={value}
                onBlur={e =>
                  handleInput(
                    setGlobalError,
                    e.target.value,
                    setUserFieldValue(e.target.value, key),
                  )
                }
                helperText={!value ? 'This field is required' : null}
              />
            )}
          </Grid>
        ))}
      </Grid>
      <UploadAvatarModal
        openUploadAvatarModal={openUploadAvatarModal}
        setOpenUploadAvatarModal={setOpenUploadAvatarModal}
        setUserFieldValue={setUserFieldValue}
        setGlobalError={setGlobalError}
      />
    </React.Fragment>
  );
}

UserForm.propTypes = {
  userDataField: PropTypes.objectOf(Object).isRequired,
  setUserFieldValue: PropTypes.func.isRequired,
  setGlobalError: PropTypes.func,
};
