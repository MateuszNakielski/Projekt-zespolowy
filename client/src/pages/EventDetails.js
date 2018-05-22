import React from 'react';
import { withStyles, Paper, Typography, Grid, Button, Chip, Avatar } from '@material-ui/core';
import { API } from '../helpers/PetAlertAPI';
import { getDisplayName, eventTypes, formatNumber } from '../helpers/Events';
import moment from 'moment';


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

  mapContainer: {
    width: '100%',
    height: 250,
    border: `1px solid #eee`,
  },

  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  },
  flex: {
    flex: 1
  },

  chip: {
    margin: theme.spacing.unit,
  },
});

class EventDetails extends React.Component {

  state = {
    isLoaded: false,
    data: {},
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { isLoaded } = this.state;
    if (!isLoaded) {
      API.getEvent({ id })
        .then(
          response => this.setState({
            isLoaded: true,
            data: response.data.event
          })
        )
    }
  }

  render() {
    const { classes } = this.props;
    const { isLoaded, data } = this.state;
    return isLoaded && (
      <div className={classes.root}>
        <Grid container spacing={16} direction="column">
          <Grid item>
            <Paper className={classes.paper}>
              <Typography variant="button">{eventTypes[data.type]}</Typography>
              <Typography variant="headline">{data.title}</Typography>
              <Typography variant="caption">
                Zgłoszone przez użytkownika {getDisplayName(data.author)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Grid container spacing={16} direction="row">
                <Grid item xs={4}>
                  <div className={classes.mapContainer}>Mapa</div>
                </Grid>
                <Grid item xs={8}>Zdjęcia</Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Grid container spacing={16} direction="column">
                <Grid item container spacing={16} direction="row">
                  <Grid item className={classes.flex}>
                    <Typography variant="body1">{data.description}</Typography>
                  </Grid>
                  <Grid item>
                    <Button>Obserwuj</Button></Grid>
                </Grid>
                <Grid item>
                  <Chip label={data.localization || "Brak lokalizacji"} className={classes.chip} />
                  <Chip label={moment.utc(data.date).fromNow()} className={classes.chip} />
                  <Chip
                    avatar={<Avatar>{formatNumber({ number: data.views })}</Avatar>}
                    label="wyświetleń"
                    className={classes.chip}
                  />
                  <Chip
                    avatar={<Avatar>{formatNumber({ number: data.followingUsers.length })}</Avatar>}
                    label="obserwujących"
                    className={classes.chip}
                  />
                  <Chip
                    avatar={<Avatar>{formatNumber({ number: data.comments.length })}</Avatar>}
                    label="komentarzy"
                    className={classes.chip}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography variant="subheading">
                Komentarze
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EventDetails);