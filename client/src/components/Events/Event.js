import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Card, CardContent, CardMedia, Chip, Typography, Button } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/pl';

import defaultPhoto from './placeholder.jpg';
import { Link } from 'react-router-dom';
import { getDisplayName, eventTypes, formatNumber } from '../../helpers/Events';
import DisplayMap from './DisplayMap';


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

  thirdCol: {
    margin: 0,
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

  getPhotoOrDefault = ({ photo }) => {
    if (photo) return `http://localhost${photo.fileName}`;
    return defaultPhoto;
  }

  render() {
    const { classes, data } = this.props;

    return (
      <Card className={classes.card}>
        <div className={classes.firstCol}>
          <CardMedia
            className={classes.photo}
            image={this.getPhotoOrDefault({ photo: (data.images.length > 0 ? data.images[0] : null) })}
            title={data.title}
          />
          <Typography variant="button" className={classes.eventType}>
            {eventTypes[data.type]}
          </Typography>
        </div>
        <div className={classes.secondCol}>
          <CardContent className={classes.content}>
            <Typography variant="headline">{data.title}</Typography>
            <Typography variant="caption">
              Zgłoszone przez użytkownika {getDisplayName(data.author)}
            </Typography>
            <Typography variant="body2">
              {data.description}
            </Typography>
          </CardContent>
          <div className={classes.footer}>
            <Chip color="secondary" label={moment.utc(data.date).fromNow()} className={classes.chip} />
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
            <Button variant="contained" color="primary" component={EventDetailsLink({ id: data.id })} className={classes.right}>Szczegóły</Button>
          </div>
        </div>
        <div className={classes.thirdCol}>
          <DisplayMap lat={data.localization.latitude} lng={data.localization.longitude} size={{width: 200, height: '100%'}} />
        </div>
      </Card>
    )
  }
}


export default withStyles(styles)(Event);