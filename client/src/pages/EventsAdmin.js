import React from 'react';
import { API } from '../helpers/PetAlertAPI';
import { Table, Paper, TableHead, TableRow, TableCell, TableBody, Checkbox, withStyles, GridList, GridListTile, Button } from '@material-ui/core';


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

  table: {
    minWidth: 700,
  },

  gridList: {
    width: theme.spacing.unit * 20,
    height: theme.spacing.unit * 10,
  },
});

class EventsAdmin extends React.Component {

  state = {
    isLoaded: false,
    events: [],
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      API.getAllEvents().then(response => {
        this.setState({
          isLoaded: true,
          events: response.data.events,
        });
      });
    }
  }

  componentDidUpdate() {
    if (!this.state.isLoaded) {
      API.getAllEvents().then(response => {
        this.setState({
          isLoaded: true,
          events: response.data.events,
        });
      });
    }
  }

  removeEvent = ({ id }) => (ev) => {
    API.removeEvent({ id }).then(() => {
      this.setState({ isLoaded: false });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Tytuł</TableCell>
              <TableCell>Autor zgłoszenia</TableCell>
              <TableCell>Data zgłoszenia</TableCell>
              <TableCell>Zdjęcia</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.events.map(event => (
                <TableRow key={event.id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{`${event.author.firstName} ${event.author.secondName}`.trim()}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>
                    <GridList cellHeight={50} className={classes.gridList} cols={3}>
                      {
                        event.images.map(
                          image => (
                            <GridListTile key={image.fileName} cols={1}>
                              <img src={`http://localhost${image.fileName}`} />
                            </GridListTile>
                          )
                        )
                      }
                    </GridList>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={this.removeEvent({ id: event.id })}>Usuń</Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(EventsAdmin);
