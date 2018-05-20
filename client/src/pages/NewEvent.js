import React from 'react';
import { withStyles, Paper, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Map from '../components/Events/Map';

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
      location: {
        lat: 52.232222,
        lng: 21.008333,
      }
    },
    mapInitialized: false
  }

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  componentDidMount() {
    if (!this.state.mapInitialized) {
      const self = this;
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      function success(pos) {
        const crd = pos.coords;
        console.log(crd);
        self.setState(
          prevState => ({
            data: {
              ...prevState.data,
              location: {
                lat: crd.latitude,
                lng: crd.longitude
              }
            },
            mapInitialized: true,
          })
        );
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }
  render() {
    const { classes } = this.props;
    const { type, title, description, location } = this.state.data;
    return (
      <Paper className={classes.root}>
        <Typography variant="title">Nowe zgłoszenie</Typography>
        <form>
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
                  <MenuItem value=""><em>brak</em></MenuItem>
                  <MenuItem value={1}>Poszukiwanie</MenuItem>
                  <MenuItem value={2}>Znalezienie</MenuItem>
                  <MenuItem value={3}>Inne</MenuItem>
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
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(NewEvent);