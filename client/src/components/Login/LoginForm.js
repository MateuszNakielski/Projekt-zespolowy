import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    overflow: 'hidden',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flex: `1 1 ${theme.spacing.unit * 25}px`,
  },
});

const LoginForm = (props) => {
  const { classes, handleChange } = props;
  const { hasError } = props.errors;
  const { username, password } = props.data;
  return (
    <div className={classes.container}>
      <TextField
        id="username"
        label="Nazwa użytkownika"
        className={classes.textField}
        type="text"
        autoComplete="username"
        value={username}
        onChange={handleChange('username')}
        margin="normal"
        error={hasError}
      />
      <TextField
        id="password"
        label="Hasło"
        className={classes.textField}
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={handleChange('password')}
        margin="normal"
        error={hasError}
      />
    </div>
  )
}
LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
