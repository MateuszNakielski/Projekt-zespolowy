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
import LoginForm from '../components/Login/LoginForm';

class Login extends React.Component {

  state = {
    username: '',
    password: '',
    hasError: false,
  }

  handleClose = () => {
    const { history } = this.props;
    this.setState({
      username: '',
      password: '',
      hasError: false,
    });

    history.goBack();
  }

  handleChange = (key) => (ev) => {
    this.setState({ [key]: ev.target.value });
  }

  render() {
    const { fullScreen } = this.props;
    const { username, password, hasError } = this.state;


    return (
      <React.Fragment>
        <Dialog
          open
          onClose={this.handleClose}
          aria-labelledby="login-title"
          fullScreen={fullScreen}
        >
          <DialogTitle id="login-title">Logowanie</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Aby się zalogować, podaj nazwę użytkownika oraz hasło.
          </DialogContentText>
            <LoginForm data={{username, password}} errors = {{hasError}} handleChange={this.handleChange} />
          </DialogContent>
          <DialogActions>
            <AuthContext.Consumer>
              {
                ({ login }) => (
                  <Button
                    color="primary"
                    onClick={() => {
                      login({username, password}).then(() => {
                        this.handleClose();
                      }).catch((error) => {
                        this.setState({ hasError: true, errorNotificationVisible: true });
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
          open={hasError}
          onClose={() => { this.setState({ hasError: false }) }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Dane logowania nie są poprawne. Spróbuj ponownie.</span>}
        />
      </React.Fragment >
    )
  }
}

export default withRouter(withMobileDialog({ breakpoint: 'xs' })(Login));