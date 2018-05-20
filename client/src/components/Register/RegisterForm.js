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

const RegisterForm = (props) => {
  const { classes, handleChange } = props;
  const { username, password, firstName, lastName, email } = props.data;
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="username"
        label="Nazwa użytkownika"
        className={classes.textField}
        type="text"
        autoComplete="username"
        value={username}
        onChange={handleChange('username')}
        margin="normal"
      />
      <TextField
        id="password"
        label="Hasło"
        className={classes.textField}
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={handleChange('password')}
        margin="normal"
      />
      <TextField
        id="firstName"
        label="Imię"
        className={classes.textField}
        type="text"
        autoComplete="given-name"
        value={firstName}
        onChange={handleChange('firstName')}
        margin="normal"
      />
      <TextField
        id="lastName"
        label="Nazwisko"
        className={classes.textField}
        type="text"
        autoComplete="family-name"
        value={lastName}
        onChange={handleChange('lastName')}
        margin="normal"
      />
      <TextField
        id="email"
        label="E-mail"
        className={classes.textField}
        type="email"
        autoComplete="email"
        value={email}
        onChange={handleChange('email')}
        margin="normal"
      />
    </form>
  )
}
RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterForm);
