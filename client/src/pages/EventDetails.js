import React from 'react';
import { withStyles, Paper, Typography, Grid, Button, Chip, Avatar, TextField, Divider, GridList, GridListTile } from '@material-ui/core';
import { API } from '../helpers/PetAlertAPI';
import { getDisplayName, eventTypes, formatNumber } from '../helpers/Events';
import moment from 'moment';
import AuthContext from '../helpers/AuthContext';
import Comment from '../components/Events/Comment';
import DisplayMap from '../components/Events/DisplayMap';


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

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flex: 1,
  },
  gridList: {
    width: theme.spacing.unit * 96,
    height: theme.spacing.unit * 48,
  },
});

class EventDetails extends React.Component {

  state = {
    isLoaded: false,
    data: {},
    comment: '',
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

  handleChange = ev => {
    const { name, value } = ev.target;
    this.setState(
      prev => ({
        [name]: value,
      })
    );
  }

  handleObserveClick = () => {
    const { id } = this.props.match.params;
    API.observeEvent({ id }).then(() => {
      API.getEvent({ id })
        .then(
          response => this.setState({
            isLoaded: true,
            data: response.data.event
          })
        )
    })
  }

  handleCommentClick = () => {
    const { id } = this.props.match.params;
    const { comment } = this.state;
    if (comment === '') return;
    API.addComment({ eventId: id, comment }).then(() => {
      API.getEvent({ id })
        .then(
          response => this.setState({
            isLoaded: true,
            data: response.data.event
          })
        )
    })
  }

  render() {
    const { classes, theme } = this.props;
    const { isLoaded, data, comment } = this.state;
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
                  <DisplayMap lat={data.localization.latitude} lng={data.localization.longitude} size={{ width: '100%', height: 400 }} />
                </Grid>
                <Grid item xs={8}>
                  <GridList cellHeight={theme.spacing.unit * 48} className={classes.gridList} cols={1}>
                    {
                      data.images.map(
                        image => (
                          <GridListTile key={image.fileName} cols={1}>
                            <img src={`http://localhost${image.fileName}`} />
                          </GridListTile>
                        )
                      )
                    }
                  </GridList>
                </Grid>
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
                    <AuthContext.Consumer>
                      {
                        ({ isAuthenticated, username }) => isAuthenticated ? (data.followingUsers.filter(
                          user => user.username === username
                        ).length === 0 ?
                          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleObserveClick}>Obserwuj</Button> :
                          <Button variant="contained" color="primary" className={classes.button} disabled>Obserwowane</Button>
                        ) : <Button variant="contained" color="primary" className={classes.button} disabled>Zaloguj się, aby obserwować</Button>
                      }
                    </AuthContext.Consumer>
                  </Grid>
                </Grid>
                <Grid item>
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
              <Grid container className={classes.flex} direction="row" spacing={16}>
                <Grid item className={classes.flex}>
                  <Typography variant="subheading">
                    Komentarze
                  </Typography>
                  {
                    data.comments.map(comment => <Comment key={comment.id} {...comment} />)
                  }
                </Grid>
                <AuthContext.Consumer>
                  {
                    ({ isAuthenticated, username }) => isAuthenticated ? (data.followingUsers.some(u => u.username === username) ? (
                      <Grid item className={classes.flex} container direction="column">
                        <Typography variant="subheading">
                          Dodaj komentarz
                        </Typography>
                        <Divider />
                        <TextField
                          id="comment"
                          name="comment"
                          label="Komentarz"
                          multiline
                          className={classes.textField}
                          rows={5}
                          value={comment}
                          onChange={this.handleChange}
                          margin="normal"
                          error={comment === ''}
                        />
                        <Grid item>
                          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleCommentClick}>Zapisz</Button>
                        </Grid>
                      </Grid>
                    ) : (
                        <Grid item className={classes.flex} container direction="column">
                          <Typography variant="subheading">
                            Obserwuj zgłoszenie, aby móc dodać komentarz.
                        </Typography>
                        </Grid>
                      )
                    ) : (
                        <Grid item className={classes.flex} container direction="column">
                          <Typography variant="subheading">
                            Zaloguj się, aby móc dodać komentarz.
                          </Typography>
                        </Grid>
                      )
                  }
                </AuthContext.Consumer>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EventDetails);