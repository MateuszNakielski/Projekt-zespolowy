import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Card, CardContent, CardMedia, Chip, Typography, Button } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/pl';

import defaultPhoto from './placeholder.jpg';
import { API } from '../../helpers/PetAlertAPI';
import { Link } from 'react-router-dom';


moment.locale('pl');

const styles = theme => ({
  card: {
    display: 'flex',
  },

  chip: {
    margin: theme.spacing.unit,
  },

  firstCol: {
    width: theme.spacing.unit * 25,
    padding: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  eventType: {
    marginTop: theme.spacing.unit,
  },

  photo: {
    width: '100%',
    paddingBottom: '100%',
  },

  secondCol: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  },

  content: {
    flex: 1
  },

  footer: {
    display: 'flex',
  },
  right: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px auto`,
  },
});

const EventDetailsLink = ({ id }) => props => <Link to={`/events/${id}`} {...props} />;

class Event extends React.Component {

  getDisplayName = ({ username, firstName, secondName }) => {
    let displayName = `${firstName || ''} ${secondName || ''}`.trim();
    return displayName.length > 0 ? displayName : username;
  }

  getPhotoOrDefault = ({ photo }) => {
    if (photo) return photo;
    return defaultPhoto;
  }

  formatNumber = ({ number }) => number > 99 ? '99+' : `${number}`;
  formatEventType = ({ eventType }) => {
    switch (eventType) {
      case 1: return 'Poszukiwanie';
      case 2: return 'Znalezienie';
      case 3: return 'Inne';
      default: return '???';
    }
  }

  render() {
    const { classes, data } = this.props;

    return (
      <Card className={classes.card}>
        <div className={classes.firstCol}>
          <CardMedia
            className={classes.photo}
            image={this.getPhotoOrDefault({ photo: null })}
            title={data.title}
          />
          <Typography variant="button" className={classes.eventType}>
            {this.formatEventType({ eventType: data.type })}
          </Typography>
        </div>
        <div className={classes.secondCol}>
          <CardContent className={classes.content}>
            <Typography variant="headline">{data.title}</Typography>
            <Typography variant="caption">
              Zgłoszone przez użytkownika {this.getDisplayName(data.author)}
            </Typography>
            <Typography variant="body2">
              {data.description}
            </Typography>
          </CardContent>
          <div className={classes.footer}>
            <Chip label={data.localization || "Brak lokalizacji"} className={classes.chip} />
            <Chip label={moment.utc(data.date).fromNow()} className={classes.chip} />
            <Chip
              avatar={<Avatar>{this.formatNumber({ number: data.views })}</Avatar>}
              label="wyświetleń"
              className={classes.chip}
            />
            <Chip
              avatar={<Avatar>{this.formatNumber({ number: data.followingUsers.length })}</Avatar>}
              label="obserwujących"
              className={classes.chip}
            />
            <Chip
              avatar={<Avatar>{this.formatNumber({ number: data.comments.length })}</Avatar>}
              label="komentarzy"
              className={classes.chip}
            />
            <Button component={EventDetailsLink({ id: data.id })} className={classes.right}>Szczegóły</Button>
          </div>
        </div>
      </Card>
    )
  }
}


export default withStyles(styles)(Event);