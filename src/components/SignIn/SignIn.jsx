import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './styles';
import PropTypes from 'prop-types';
import axios from 'axios';
export default function SignIn({ history }) {
  const classes = useStyles();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_AUTH_URL, { nickname, password })
      .then(response => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        history.push('/');
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setFormError('The login or password is incorrect.');
        }
        if (error && error.message === 'Network Error') {
          setFormError(`Please use VPN for authorization (${error.message})`);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          variant="rounded"
          className={classes.avatar}
          src="https://image.flaticon.com/icons/svg/893/893505.svg"
        />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={e => handleSubmit(e)}>
          {formError ? <Typography color="error">{formError}</Typography> : null}
          <TextField
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address/Login"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setNickname(e.target.value)}
          />
          <TextField
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <Typography className={classes.buttonLabel}>Sign In</Typography>
          </Button>
        </form>
      </div>
    </Container>
  );
}

SignIn.propTypes = {
  history: PropTypes.func,
};
