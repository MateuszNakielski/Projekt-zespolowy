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

const ProfileForm = (props) => {
  const { classes, handleChange } = props;
  const { firstName, lastName, phone } = props.data;
  return (
    <form className={classes.container} noValidate autoComplete="off">
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
        id="phone"
        label="Telefon"
        className={classes.textField}
        type="text"
        autoComplete="phone"
        value={phone}
        onChange={handleChange('phone')}
        margin="normal"
      />
    </form>
  )
}

export default withStyles(styles)(ProfileForm);
