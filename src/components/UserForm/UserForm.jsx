import React, { useState } from 'react';
import { Grid, TextField, Typography, Tooltip, Button } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { handleInput } from '../../services/HandleInput';
import UploadAvatarModal from '../UploadAvatarModal';
import { StoreContext } from '../../store/Store';

import { observer } from 'mobx-react-lite';

import { useStyles } from './styles';
const UserForm = observer(function UserForm({ setGlobalError }) {
  const store = React.useContext(StoreContext);
  const { userFields } = store;

  const [openUploadAvatarModal, setOpenUploadAvatarModal] = useState(false);

  const avatarPreview = () => {
    if (userFields.$photo) {
      const avatarUrl = userFields.$photo.split('main')[1];
      const previewAvatarUrl = `https://gitlab.nixdev.co/cv/main/-/raw/master${avatarUrl}`;
      return previewAvatarUrl;
    }
  };

  const capitalizeLabel = label => {
    if (typeof label !== 'string') return '';
    const cutLabel = label.substring(1);
    const changedLabel = cutLabel.charAt(0).toUpperCase() + cutLabel.slice(1);
    return changedLabel;
  };

  const checkPhotoExist = () => {
    const userFieldKeys = Object.keys(userFields);
    return userFieldKeys.includes('$photo');
  };

  const removePhotoField = () => {
    store.removeUserPhoto();
  };

  const addPhotoField = () => {
    store.addUserPhoto();
  };

  const handleChangeField = (key, value) => {
    store.setUserField(key, value);
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        PERSONAL DETAILS
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(userFields).map(([key, value]) => (
          <Grid key={key} item sm={key === '$photo' ? 12 : 6} xs={12}>
            {key === '$photo' ? (
              <span>
                <Tooltip title="Specify the path to the file or upload file.">
                  <TextField
                    error={!value}
                    variant="outlined"
                    fullWidth
                    key="$photo"
                    label="Photo"
                    value={value}
                    onChange={e =>
                      handleInput(
                        setGlobalError,
                        e.target.value,
                        handleChangeField(key, e.target.value),
                      )
                    }
                    helperText={!value ? 'This field is required' : null}
                  />
                </Tooltip>
                {userFields.$photo ? (
                  <>
                    <Typography>Preview</Typography>
                    <img
                      //onError={() => handleErrorImg()}
                      src={avatarPreview()}
                      className={classes.avatar}
                      alt="Photo not found in git"
                    />
                  </>
                ) : (
                  <>
                    <Typography>Preview</Typography>
                    <Typography color="error">Invalid photo url</Typography>
                  </>
                )}
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
                onChange={e =>
                  handleInput(
                    setGlobalError,
                    e.target.value,
                    handleChangeField(key, e.target.value),
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
        setGlobalError={setGlobalError}
      />
      {checkPhotoExist() ? (
        <Button
          className={classes.photoButton}
          variant="contained"
          color="secondary"
          onClick={() => removePhotoField()}
        >
          Remove section photo
        </Button>
      ) : (
        <Button
          className={classes.photoButton}
          variant="contained"
          color="primary"
          onClick={() => addPhotoField()}
        >
          Add section photo
        </Button>
      )}
    </React.Fragment>
  );
});

export default UserForm;

UserForm.propTypes = {
  setGlobalError: PropTypes.func,
};
