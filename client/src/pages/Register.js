import React from 'react';
import AuthContext from '../helpers/AuthContext';
import qs from 'qs';
import { withRouter } from 'react-router';
import RegisterForm from '../components/Register/RegisterForm';
import { withStyles, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, Button, withMobileDialog } from '@material-ui/core';


const styles = theme => ({
  button: {
    margin: `0 ${theme.spacing.unit}px`
  }
});

class Register extends React.Component {

  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  }

  handleClose = () => {
    const { history } = this.props;
    const next = qs.parse(history.location.search.substring(1)).next || '/events';
    this.setState({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      hasError: false,
    });

    history.push(next);
  }

  handleChange = (key) => (ev) => {
    this.setState({ [key]: ev.target.value });
  }

  render() {
    const { fullScreen, classes } = this.props;

    // TODO: Refactor to proper form with button type=submit, handle validation in onSubmit.
    return (
      <React.Fragment>
        <Dialog
          open
          onClose={this.handleClose}
          aria-labelledby="register-title"
          fullScreen={fullScreen}
        >
          <DialogTitle id="register-title">Rejestracja</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Aby się zarejestrować, uzupełnij swoje dane.
            </DialogContentText>
            <RegisterForm data={this.state} handleChange={this.handleChange} />
          </DialogContent>
          <DialogActions>
            <AuthContext.Consumer>
              {
                ({ register }) => (
                  <Button
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    onClick={() => {
                      register(this.state).then(() => {
                        this.handleClose();
                      }).catch(() => {
                        this.setState({ hasError: true })
                      });
                    }}
                  >
                    Zarejestruj
                </Button>
                )
              }
            </AuthContext.Consumer>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={this.state.hasError}
          onClose={() => { this.setState({ hasError: false }) }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Wystąpił błąd poczas rejestracji. Spróbuj ponownie.</span>}
        />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(withRouter(withMobileDialog({ breakpoint: 'xs' })(Register)));