import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Event from '../components/Events/Event';
import Grid from '@material-ui/core/Grid'


const events = [
  {
    "id": 5,
    "title": "ĄĘÓŚŻŹĆŃŁąęóśżźćńł",
    "description": "opis",
    "date": "2018-05-14 19:39",
    "localization": null,
    "type": 1,
    "views": 0,
    "author": {
      "id": 2,
      "firstName": "Mateusz",
      "secondName": "Nakielski",
    },
    "followingUsers": 15,
    "comments": 0,
    "images": [],
    "active": true
  },
  {
    "id": 7,
    "title": "ĄĘÓŚŻŹĆŃŁąęóśżźćńł",
    "description": "opis",
    "date": "2018-05-14 19:39",
    "localization": null,
    "type": 1,
    "views": 0,
    "author": {
      "id": 2,
      "firstName": "Mateusz",
      "secondName": "Nakielski",
    },
    "followingUsers": 4,
    "comments": 0,
    "images": [],
    "active": true
  }
]

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
});

class Events extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16} direction='column'>
        {events.map(ev => (
          <Grid item>
            <Event key={ev.id} data={ev} />
          </Grid>
          ))}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Events);