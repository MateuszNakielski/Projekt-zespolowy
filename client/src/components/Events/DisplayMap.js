import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  mapContainer: {
    border: `1px solid #eee`,
  },
}

const Circle = ({ zoom }) => (
  <div
    style={{
      color: 'white',
      background: 'rgba(0,255,0,0.5)',
      padding: `${zoom}px ${zoom}px`,
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }} />
)

class DisplayMap extends Component {

  state = {
    zoom: 15
  }

  static defaultProps = {
    onClick: () => {}
  }

  handleChange = ({ zoom }) => {
    this.setState({ zoom });
  }
  render() {
    const { size, lat, lng, classes, onClick } = this.props;
    return (
      <div className={classes.mapContainer} style={{
        width: size.width,
        height: size.height
      }}>
        <GoogleMapReact
          bootstrapURLKeys={
            {
              key: "AIzaSyC0xpBaIropx5215y3nOiIwyFl-zqPfECQ",
              language: 'pl',
              region: 'pl',
            }
          }
          defaultCenter={{ lat, lng }}
          zoom={this.state.zoom}
          onChange={this.handleChange}
          onClick={onClick}
        >
          <Circle lat={lat} lng={lng} zoom={Math.pow(1.25, this.state.zoom)} />
        </GoogleMapReact>
      </div>
    );
  }
};

export default withStyles(styles)(DisplayMap);