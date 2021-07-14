import React from 'react';
import { Typography } from '@material-ui/core';
import SimpleSection from '../SimpleSection';

const Section = props => {
  return (
    <SimpleSection {...props}>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {props.EditButton && props.EditButton}
        {props.title}
        {props.AddTooltip && props.AddTooltip}
        {props.DeleteButton && props.DeleteButton}
      </Typography>
      {props.children}
    </SimpleSection>
  );
};

export default Section;
