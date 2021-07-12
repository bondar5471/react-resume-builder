import React from 'react';
import { Card } from '@material-ui/core';

const SimpleSection = props => {
  return <Card {...props}>{props.children}</Card>;
};

export default SimpleSection;
