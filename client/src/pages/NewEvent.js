import React from 'react';
import { withStyles, Paper, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Map from '../components/Events/Map';
import { API } from '../helpers/PetAlertAPI';
import { eventTypes } from '../helpers/Events';

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 10}px auto 0`,
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    maxWidth: theme.spacing.unit * 150,
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },

  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing.unit,
  },
});

class NewEvent extends React.Component {
  state = {
    data: {
      title: '',
      description: '',
      type: '',
      localization: {
        latitude: 52.232222,
        longitude: 21.008333,
      },
      images: [],
    },
    mapInitialized: false
  }

  handleChange = ev => {
    const { name, value } = ev.target;
    this.setState(
      prev => ({
        data: {
          ...prev.data,
          [name]: value,
        },
      })
    );
  }

  handleSubmit = ev => {
    ev.preventDefault();
    API.addEvent({ event: this.state.data })
      .then(response => response.data.event)
      .then(event => {
        this.props.history.push(`/events/${event.id}`);
      });
  }

  render() {
    const { classes } = this.props;
    const { type, title, description, location } = this.state.data;
    return (
      <Paper className={classes.root}>
        <Typography variant="title">Nowe zgłoszenie</Typography>
        <form onSubmit={this.handleSubmit}>
          <div className={classes.row}>
            <div className={classes.column}>
              <FormControl margin="normal">
                <InputLabel htmlFor="type">Typ zgłoszenia</InputLabel>
                <Select
                  value={type}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'type',
                    id: 'type',
                  }}
                >
                  <MenuItem value><em>brak</em></MenuItem>
                  { Object.keys(eventTypes).map(key => <MenuItem key={key} value={key}>{eventTypes[key]}</MenuItem>) }
                </Select>
              </FormControl>
              <TextField
                id="title"
                name="title"
                label="Tytuł"
                className={classes.textField}
                type="text"
                value={title}
                onChange={this.handleChange}
                margin="normal"
              //error={this.hasError}
              />
              <TextField
                id="description"
                name="description"
                label="Opis"
                className={classes.description}
                multiline
                rows={5}
                value={description}
                onChange={this.handleChange}
                margin="normal"
              //error={this.hasError}
              />
            </div>
            <div className={classes.column}>
              <Map {...location} />
              <p>Załączniki</p>
            </div>
          </div>
          <div className={classes.row}>
            <Button type="submit">Wyślij zgłoszenie</Button>
          </div>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(NewEvent);