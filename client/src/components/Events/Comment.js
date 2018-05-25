import React from 'react';
import { Grid, Typography, withStyles, Divider } from '@material-ui/core';
import { getDisplayName } from '../../helpers/Events';
import moment from 'moment';

moment.locale('pl');

const styles = {
  flex: {
    flex: 1,
  },
};

const Comment = (props) => {
  const { classes } = props;
  return (
    <Grid container direction="column" className={classes.flex}>
      <Divider/>
      <Typography variant="body1">{props.comment}</Typography>
      <Grid container direction="row" alignItems="space-between">
        <Grid item className={classes.flex}>
          <Typography variant="caption">{getDisplayName(props.user)}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">{moment.utc(props.date).fromNow()}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Comment);