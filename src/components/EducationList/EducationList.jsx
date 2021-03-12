import React from 'react';
import PropTypes from 'prop-types';
import chunk from 'lodash/chunk';
import {
  List,
  Grid,
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import { useStyles } from './styles';

export default function EducationList({ value, updateField, removeFieldFromEducation }) {
  const classes = useStyles();
  const splitArray = value => {
    const splitedArray = chunk(value, 2);
    return splitedArray;
  };
  return (
    <List component="nav">
      <Grid container spacing={2} justify="flex-start">
        {splitArray(value).map((pair, index) => (
          <Grid item xs={12} key={`${index}-box`} className={classes.educationContainer}>
            <ListItem button onClick={() => updateField(pair, index, splitArray(value))}>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography key={`${pair[0]}-institution`}>
                      Educational institution: {pair[0]}
                    </Typography>
                    <Typography key={`${pair[1]}-degree`}>Degree: {pair[1]}</Typography>
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <InputAdornment position="end">
                  <IconButton
                    variant="contained"
                    color="secondary"
                    onClick={() => removeFieldFromEducation(pair[0], pair[1])}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </InputAdornment>
              </ListItemSecondaryAction>
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </List>
  );
}

EducationList.propTypes = {
  value: PropTypes.array,
  updateField: PropTypes.func,
  removeFieldFromEducation: PropTypes.func,
};
