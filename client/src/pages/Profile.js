import React, { Component } from 'react'
import { withMobileDialog, Dialog, DialogTitle, DialogContent, DialogContentText, withStyles, DialogActions, Button } from '@material-ui/core';
import qs from 'qs'
import { API } from '../helpers/PetAlertAPI';
import { withRouter } from 'react-router';
import ProfileForm from '../components/Profile/ProfileForm';

const styles = theme => ({
  button: {
    margin: `0 ${theme.spacing.unit}px`
  }
});

class Profile extends Component {
  
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    isLoaded: false,
  }

  componentDidMount(){
    if(!this.state.isLoaded){
      API.getUser().then(response => {
        const { firstName, secondName, phoneNumber } = response.data.user;
        this.setState({
          firstName: firstName || '',
          lastName: secondName || '',
          phone: phoneNumber || '',
          isLoaded: true
        });
      });
    }
  }

  componentDidUpdate(){
    if(!this.state.isLoaded){
      API.getUser().then(response => {
        const { firstName, secondName, phoneNumber } = response.data.user;
        this.setState({
          firstName: firstName || '',
          lastName: secondName || '',
          phone: phoneNumber || '',
          isLoaded: true
        });
      });
    }
  }


  handleChange = (key) => (ev) => {
    this.setState({ [key]: ev.target.value });
  }

  handleClose = () => {
    const { history } = this.props;
    const next = qs.parse(history.location.search.substring(1)).next || '/events';
    this.setState({
      firstName: '',
      lastName: '',
      phone: '',
      isLoaded: false,
    });

    history.push(next);
  }


  render() {
    const { fullScreen, classes } = this.props;
    return (
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
          <ProfileForm data={this.state} handleChange={this.handleChange} />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            onClick={() => {
              API.updateUser(this.state).then(() => {
                this.handleClose();
              }).catch(() => {
                this.setState({ hasError: true })
              });
            }}
          >
            Aktualizuj
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(withRouter(withMobileDialog({ breakpoint: 'xs' })(Profile)));