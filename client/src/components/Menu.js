import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person'
import { Link } from 'react-router-dom';
import AuthContext from '../helpers/AuthContext';

const styles = theme => ({
});
const Menu = (props) => {
  const { classes } = props;

  const unauthenticatedItems = (
    <React.Fragment>
      <Button component={Link} color="inherit" to='/signup'>Rejestracja</Button>
      <Button component={Link} color="inherit" to='/login'>Logowanie</Button>
    </React.Fragment>
  );

  const ProfileLink = props => <Link to='/profile' {...props}></Link>
  const authenticatedItems = ({ displayName }) => (
    <IconButton component={ProfileLink}>
      <PersonIcon />
    </IconButton>
  );

  return (
    <AuthContext.Consumer>
      {({ isAuthenticated, displayName }) => isAuthenticated ? authenticatedItems({ displayName }) : unauthenticatedItems}
    </AuthContext.Consumer>
  )
}

export default withStyles(styles)(Menu);
