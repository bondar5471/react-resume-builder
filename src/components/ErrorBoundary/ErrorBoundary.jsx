import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import styles from './styles';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    const { classes } = this.props;
    if (hasError) {
      return (
        <div className={classes.wraper}>
          <div className={classes.paper}>
            <Avatar
              variant="rounded"
              className={classes.avatar}
              src="https://image.flaticon.com/icons/png/512/3273/3273666.png"
            />
            <Typography component="h1" variant="h5">
              Resume Editor
            </Typography>
          </div>
          <Typography variant="h2" className={classes.head}>
            OOOPS!
          </Typography>
          <Typography vapiant="h4" className={classes.message}>
            Sorry, something went wrong.
          </Typography>
          <Divider variant="inset" component="div" />
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.objectOf(Object).isRequired,
};

export default withStyles(styles)(ErrorBoundary);
