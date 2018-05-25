import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Menu from './Menu'
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    maxWidth: theme.spacing.unit * 150,
    width: '100%'
  },
  title: {
    cursor: 'pointer',
  },
  flex: {
    flex: 1,
  },
});

function DesktopAppBar(props) {
  const { history, classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ alignItems: 'center' }}>
        <Toolbar className={classes.container}>
          <Hidden smUp>
            <IconButton className={classes.menuButton} aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="title" className={classes.title} onClick={() => { history.push('/events') }}>
            PetAlert
          </Typography>
          <div className={classes.flex} />
          <Hidden xsDown>
            <Menu />
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}

DesktopAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(DesktopAppBar));
