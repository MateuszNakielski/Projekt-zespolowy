import React from 'react';
import { withStyles, Paper, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, GridList, GridListTile } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import ReactFileReader from 'react-file-reader';
import DisplayMap from '../components/Events/DisplayMap';
import { API } from '../helpers/PetAlertAPI';
import { eventTypes } from '../helpers/Events';

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
    row: {
        display: 'flex',
        flexDirection: 'row',
    },

    column: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing.unit,
    },
    gridList: {
        width: theme.spacing.unit * 50,
        height: theme.spacing.unit * 50,
    },
    button: {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    fullHeight: {
        display: 'inline-block',
        width: '100%',
        height: theme.spacing.unit * 25,
    },
});

class NewEvent extends React.Component {
    state = {
        data: {
            title: '',
            description: '',
            type: '',
            localization: {
                latitude: 52.232222,
                longitude: 21.008333,
            },
            images: [],
        },
        errors: {
            title: true,
            description: true,
            type: true,
        },
        mapInitialized: false
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          console.log(coords);
            this.setState(({ data }) => ({ data: { ...data, localization: { latitude: coords.latitude, longitude: coords.longitude } } }));
        }, (err) => {
          console.log(err)
        }, { enableHighAccuracy: true })
    }

    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState(
            prev => ({
                data: {
                    ...prev.data,
                    [name]: value,
                },
                errors: {
                    ...prev.errors,
                    [name]: value === ''
                }
            })
        );
    }

    handleMapClick = ({ lat, lng }) => {
        this.setState(({ data }) => ({ data: { ...data, localization: { latitude: lat, longitude: lng } } }));
    }

    handleFiles = files => {
        Array.prototype.forEach.call(files, file => {
            var reader = new FileReader();
            reader.onloadend = ev => {
                this.setState(
                    prev => ({
                        data: {
                            ...prev.data,
                            images: [
                                ...prev.data.images,
                                {
                                    fileContent: ev.target.result,
                                    fileName: file.name,
                                }
                            ]
                        }
                    })
                );
            }
            reader.readAsDataURL(file);
        });
    }

    handleSubmit = ev => {
        ev.preventDefault();
        const { errors, data } = this.state;
        let event = { ...data, images: data.images.map(el => ({ ...el, fileContent: el.fileContent.split('base64,')[1] })) }
        if (errors.title || errors.description || errors.type) return;
        API.addEvent({ event })
            .then(response => response.data.event)
            .then(event => {
                this.props.history.push(`/events/${event.id}`);
            });
    }

    render() {
        const { classes, theme } = this.props;
        const { type, title, description, localization, images } = this.state.data;
        const { errors } = this.state;
        return (
            <Paper className={classes.root}>
                <Typography variant="title">Nowe zgłoszenie</Typography>
                <form onSubmit={this.handleSubmit}>
                    <div className={classes.row}>
                        <div className={classes.column}>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="type">Typ zgłoszenia</InputLabel>
                                <Select
                                    value={type}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'type',
                                        id: 'type',
                                    }}
                                    error={errors.type}
                                >
                                    <MenuItem value=''><em>brak</em></MenuItem>
                                    {Object.keys(eventTypes).map(key => <MenuItem key={key} value={key}>{eventTypes[key]}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <TextField
                                id="title"
                                name="title"
                                label="Tytuł"
                                className={classes.textField}
                                type="text"
                                value={title}
                                onChange={this.handleChange}
                                margin="normal"
                                error={errors.title}
                            />
                            <TextField
                                id="description"
                                name="description"
                                label="Opis"
                                multiline
                                rows={5}
                                className={classes.textField}
                                value={description}
                                onChange={this.handleChange}
                                margin="normal"
                                error={errors.description}
                            />
                        </div>
                        <div className={classes.column}>
                            <Typography variant="subheading">Lokalizacja</Typography>
                            <DisplayMap size={{ width: '100%', height: 400 }} lat={localization.latitude} lng={localization.longitude} onClick={this.handleMapClick} />
                        </div>
                        <div className={classes.column}>
                            <Typography variant="subheading">Zdjęcia</Typography>
                            <GridList cellHeight={theme.spacing.unit * 25} className={classes.gridList} cols={2}>
                                {
                                    images.map(
                                        image => (
                                            <GridListTile key={image.fileName} cols={1}>
                                                <img src={image.fileContent} />
                                            </GridListTile>
                                        )
                                    )
                                }
                                <GridListTile cols={1}>
                                    <ReactFileReader handleFiles={this.handleFiles} multipleFiles={true}>
                                        <span className={classes.fullHeight}>
                                            <IconButton color="primary" className={classes.button} component="span">
                                                <PhotoCamera />
                                            </IconButton>
                                        </span>
                                    </ReactFileReader>
                                </GridListTile>
                                }
              </GridList>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <Button type="submit">Wyślij zgłoszenie</Button>
                    </div>
                </form>
            </Paper >
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewEvent);