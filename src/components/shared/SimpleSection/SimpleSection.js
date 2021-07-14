import React from 'react';
import { PropTypes } from 'prop-types';

const SimpleSection = props => {
  return <React.Fragment {...props}>{props.children}</React.Fragment>;
};

SimpleSection.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SimpleSection;
