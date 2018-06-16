import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, IconButton, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person'
import { Link } from 'react-router-dom';
import AuthContext from '../helpers/AuthContext';


const styles = theme => ({
  button: {
    margin: `0 ${theme.spacing.unit}px`
  }
});
const Menu = ({ classes }) => {

  const unauthenticatedItems = (
    <React.Fragment>
      <Button variant="contained" color="secondary" className={classes.button} component={Link} to='/signup'>Rejestracja</Button>
      <Button variant="contained" color="secondary" className={classes.button} component={Link} to='/login'>Logowanie</Button>
    </React.Fragment>
  );

  const ProfileLink = props => <Link to='/profile' {...props}></Link>
  const authenticatedItems = ({ displayName, logout }) => (
    <React.Fragment><Typography>{displayName}</Typography>
      <IconButton component={ProfileLink} color="secondary">
        <PersonIcon />
      </IconButton>
      <Button variant="contained" color="secondary" className={classes.button} onClick={logout}>Wyloguj</Button>
    </React.Fragment>
  );

  return (
    <AuthContext.Consumer>
      {({ isAuthenticated, displayName, logout }) => isAuthenticated ? authenticatedItems({ displayName, logout }) : unauthenticatedItems}
    </AuthContext.Consumer>
  )
}

export default withStyles(styles)(Menu);
