import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import placeholder from './placeholder.jpg';

const styles = theme => ({
  event: {
    flexGrow: 1,
  },
  thumb: {
    maxWidth: theme.spacing.unit*16,
  }
});

const Event = props => {
  const { classes } = props;
  // https://material-ui-next.com/demos/cards/
  return (
    <Paper className={classes.event}>
    <Grid container justify="space-around" spacing={8}>
      <Grid item>
        <img src={placeholder} className={classes.thumb} alt="..." />
      </Grid>
      <Grid item>
        <Typography gutterBottom> {JSON.stringify(props.data)} </Typography>
      </Grid>
    </Grid>
      
    </Paper>
  )
}

export default withStyles(styles)(Event);