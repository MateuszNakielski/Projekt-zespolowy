import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import NotificationContext from '../helpers/NotificationContext';
import { withRouter } from 'react-router';
import { API } from '../helpers/PetAlertAPI';
import { Button } from '@material-ui/core';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class ConsecutiveSnackbars extends React.Component {
  state = {
    open: false,
    messageInfo: {},
  };

  queue = [];

  componentDidMount() {
    this.interval = setInterval(() => {
      API.getNotifications().then(response => {
        response.data.forEach(notification => this.addNotification({
          message: notification.content,
          eventId: notification.event
        }));
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  addNotification = ({ message, eventId }) => {
    console.log(message)
    this.queue.push({
      message,
      eventId,
      key: new Date().getTime(),
    });

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  goToEvent = ({ eventId }) => () => {
    this.props.history.push(`/events/${eventId}`);
  }

  render() {
    const { classes } = this.props;
    const { message, key, eventId } = this.state.messageInfo;
    return (
      <NotificationContext.Provider value={{ addNotification: this.addNotification }}>
        <Snackbar
          key={key}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <Button key="go" variant="contained" color="secondary" size="small" onClick={this.goToEvent({ eventId })}>
              Przejdź
            </Button>,
          ]}
        />
      </NotificationContext.Provider>
    );
  }
}

ConsecutiveSnackbars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ConsecutiveSnackbars));
