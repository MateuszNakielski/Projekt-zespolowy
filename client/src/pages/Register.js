import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Snackbar from '@material-ui/core/Snackbar';
import AuthContext from '../helpers/AuthContext';
import { withRouter } from 'react-router';
import RegisterForm from '../components/Register/RegisterForm';

class Register extends React.Component {

  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',

  }

  handleClose = () => {
    const { history } = this.props;
    this.setState({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    });

    history.goBack();
  }

  handleChange = (key) => (ev) => {
    this.setState({ [key]: ev.target.value });
  }

  render() {
    const { fullScreen } = this.props;

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
                    color="primary"
                    onClick={() => {
                      register(this.state).then(() => {
                        this.handleClose();
                      }).catch((error) => {
                        console.log("Coś się popsuło")
                        console.log(error);
                        /* ... */
                      });
                    }}
                  >
                    Zaloguj
                </Button>
                )
              }
            </AuthContext.Consumer>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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

export default withRouter(withMobileDialog({ breakpoint: 'xs' })(Register));