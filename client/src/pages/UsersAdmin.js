import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@material-ui/core';
import { API } from '../helpers/PetAlertAPI';

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
});

class UsersAdmin extends React.Component {

  state = {
    isLoaded: false,
    users: [],
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      API.getAllUsers().then(response => {
        this.setState({
          isLoaded: true,
          users: response.data.users
        });
      });
    }
  }

  componentDidUpdate() {
    if (!this.state.isLoaded) {
      API.getAllUsers().then(response => {
        this.setState({
          isLoaded: true,
          users: response.data.users
        });
      });
    }
  }

  toggleActivation = ({ id }) => (ev) => {
    API.toggleActivation({ id, activate: ev.target.checked }).then(() => {
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
              <TableCell>Nazwa użytkownika</TableCell>
              <TableCell>Imię</TableCell>
              <TableCell>Nazwisko</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Czy aktywny</TableCell>
              <TableCell>Czy administrator</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map(user =>
              (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.secondName}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>
                    <Checkbox checked={user.status === 3} onChange={this.toggleActivation({ id: user.id })} />
                  </TableCell>{/* Brak endpointa dla edycji usera */}
                  <TableCell>
                    <Checkbox checked={user.roles.includes("ADMIN")} />
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

export default withStyles(styles)(UsersAdmin);
