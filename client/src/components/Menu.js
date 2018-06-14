import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, IconButton, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person'
import { Link } from 'react-router-dom';
import AuthContext from '../helpers/AuthContext';


const styles = theme => ({

});
const Menu = (props) => {
  //const { classes } = props;

  const unauthenticatedItems = (
    <React.Fragment>
      <Button component={Link} color="inherit" to='/signup'>Rejestracja</Button>
      <Button component={Link} color="inherit" to='/login'>Logowanie</Button>
    </React.Fragment>
  );

  const ProfileLink = props => <Link to='/profile' {...props}></Link>
  const authenticatedItems = ({ displayName, logout }) => (
    <React.Fragment><Typography>{displayName}</Typography>
      <IconButton component={ProfileLink}>
        <PersonIcon />
      </IconButton>
      <Button onClick={logout}>Wyloguj</Button>
    </React.Fragment>
  );

  return (
    <AuthContext.Consumer>
      {({ isAuthenticated, displayName, logout }) => isAuthenticated ? authenticatedItems({ displayName, logout }) : unauthenticatedItems}
    </AuthContext.Consumer>
  )
}

export default withStyles(styles)(Menu);
