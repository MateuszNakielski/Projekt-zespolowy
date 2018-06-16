import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';

import Event from '../components/Events/Event';
import { API } from '../helpers/PetAlertAPI';
import { Link } from 'react-router-dom';


const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 10,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    maxWidth: theme.spacing.unit * 150,
    width: '100%',
    margin: '0 auto'
  },
  button: {
    margin: theme.spacing.unit,
  },
  card: {
    display: 'flex',
  },
});

const NewEventLink = props => <Link to='/events/new' {...props} />;

class Events extends Component {

  state = {
    loaded: false,
    events: [],
  }
  componentDidMount = () => {
    if (!this.state.loaded) {
      API.getAllEvents()
        .then(response => response.data.events)
        .then(events => {
          this.setState({ loaded: true, events });
        });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16} direction='column'>
          <Grid item>
            <Paper className={classes.card}>
              <Button variant="contained" color="primary" className={classes.button} component={NewEventLink}>
                Nowe zgłoszenie
              </Button>
            </Paper>
          </Grid>
          {this.state.events.map(ev => (
            <Grid key={ev.id} item>
              <Event data={ev} />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Events);