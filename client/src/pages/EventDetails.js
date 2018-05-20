import React from 'react';
import { withStyles } from '@material-ui/core';

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

class EventDetails extends React.Component {
    render() {
        const { classes } = this.props;
        const { id } = this.props.match.params;
        return <div className={classes.root}>Szczegóły zgłoszenia nr {id}</div>;
    }
}

export default withStyles(styles)(EventDetails);