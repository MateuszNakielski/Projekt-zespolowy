import React from 'react';
import AuthContext from '../helpers/AuthContext';
import qs from 'qs';
import { withRouter } from 'react-router';
import LoginForm from '../components/Login/LoginForm';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar, withMobileDialog, withStyles } from '@material-ui/core';


const styles = theme => ({
  button: {
    margin: `0 ${theme.spacing.unit}px`
  }
});
class Login extends React.Component {

  state = {
    username: '',
    password: '',
    hasError: false,
  }

  handleSubmit = ({ login }) => (ev) => {
    ev.preventDefault();
    const { username, password } = this.state;

    login({ username, password }).then(() => {
      this.handleClose();
    }).catch((error) => {
      this.setState({ hasError: true, errorNotificationVisible: true });
    });
  }

  handleClose = () => {
    const { history } = this.props;
    const next = qs.parse(history.location.search.substring(1)).next || '/events';
    this.setState({
      username: '',
      password: '',
      hasError: false,
    });

    history.push(next);
  }

  handleChange = (key) => (ev) => {
    this.setState({ [key]: ev.target.value });
  }

  render() {
    const { fullScreen, classes } = this.props;
    const { username, password, hasError } = this.state;


    return (
      <React.Fragment>
        <AuthContext.Consumer>
          {
            ({ login }) => (
              <Dialog
                open
                onClose={this.handleClose}
                aria-labelledby="login-title"
                fullScreen={fullScreen}
              >
                <form onSubmit={this.handleSubmit({ login })}>
                  <DialogTitle id="login-title">Logowanie</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Aby się zalogować, podaj nazwę użytkownika oraz hasło.
                    </DialogContentText>
                    <LoginForm data={{ username, password }} errors={{ hasError }} handleChange={this.handleChange} />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Zaloguj
                    </Button>
                    <Button variant="contained" color="secondary" type="button" onClick={() => this.props.history.goBack()}>Powrót</Button>
                  </DialogActions>
                </form>
              </Dialog>
            )
          }
        </AuthContext.Consumer>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={hasError}
          onClose={() => { this.setState({ hasError: false }) }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Dane logowania nie są poprawne. Spróbuj ponownie.</span>}
        />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(withRouter(withMobileDialog({ breakpoint: 'xs' })(Login)));